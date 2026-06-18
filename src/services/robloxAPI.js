// Production-ready API service to fetch Roblox game data
// Uses Vite server proxy in development and Vercel rewrites in production to bypass CORS

import racingImg from '../assets/images/racing_game.png';

// Add your actual Roblox place IDs here!
// You can add more place IDs to this array to show more games.
const TARGET_PLACE_IDS = [117722220899020,105083283355527]; // "Ban Thai Racing"

/**
 * Gets universe ID from place ID
 */
async function getUniverseId(placeId) {
  try {
    const response = await fetch(`/api/roblox-universes/universes/v1/places/${placeId}/universe`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.universeId;
  } catch (err) {
    console.error(`Failed to fetch universe ID for place ${placeId}:`, err);
    return null;
  }
}

/**
 * Fetch thumbnail for a universe
 */
async function getThumbnails(universeIds) {
  try {
    const url = `/api/roblox-thumbnails/v1/games/icons?universeIds=${universeIds.join(',')}&size=512x512&format=Png&isCircular=false`;
    const response = await fetch(url);
    if (!response.ok) return {};
    const data = await response.json();
    
    // Convert to a map of universeId -> imageUrl
    const thumbnails = {};
    if (data.data) {
      data.data.forEach(item => {
        thumbnails[item.targetId] = item.imageUrl;
      });
    }
    return thumbnails;
  } catch (err) {
    console.error('Failed to fetch thumbnails:', err);
    return {};
  }
}

/**
 * Main function to fetch all games
 */
export async function fetchGames() {
  try {
    // 1. Get Universe IDs for all target places
    const universeIds = [];
    const placeToUniverseMap = {};
    
    for (const placeId of TARGET_PLACE_IDS) {
      const uId = await getUniverseId(placeId);
      if (uId) {
        universeIds.push(uId);
        placeToUniverseMap[uId] = placeId;
      }
    }

    if (universeIds.length === 0) {
      console.warn("Could not resolve any universe IDs.");
      return [];
    }

    // 2. Fetch game details and thumbnails in parallel
    const detailsUrl = `/api/roblox-games/v1/games?universeIds=${universeIds.join(',')}`;
    
    const [detailsResponse, thumbnailsMap] = await Promise.all([
      fetch(detailsUrl),
      getThumbnails(universeIds)
    ]);

    if (!detailsResponse.ok) {
      throw new Error("Failed to fetch game details");
    }

    const detailsData = await detailsResponse.json();

    // 3. Format to match our app's GameCard props
    const realGames = detailsData.data.map(game => {
      const placeId = placeToUniverseMap[game.id];
      const playing = game.playing || 0;
      const maxPlayers = game.maxPlayers || 1000;
      
      return {
        universeId: game.id,
        placeId: placeId,
        name: game.name,
        description: game.description,
        creator: game.creator?.name || 'xSaikiz Studio',
        playing: playing,
        maxPlayers: maxPlayers,
        visits: game.visits || 0,
        favoritedCount: game.favoritedCount || 0,
        genre: game.genre || 'Experience',
        isActive: playing > 0, // Mark active if there are players
        thumbnail: thumbnailsMap[game.id] || racingImg, // Fallback image
        created: game.created,
        updated: game.updated,
        // Optional link straight to the game
        playUrl: `https://www.roblox.com/games/${placeId}`
      };
    });

    return realGames;
  } catch (error) {
    console.error("Error fetching live Roblox data:", error);
    return [];
  }
}

export async function fetchGameById(universeId) {
  const allGames = await fetchGames();
  return allGames.find((g) => g.universeId === universeId) || null;
}

export async function fetchPlayerCounts() {
  const allGames = await fetchGames();
  return allGames.map((g) => ({
    universeId: g.universeId,
    playing: g.playing
  }));
}

import './GameCard.css';

function formatCount(num) {
  if (num == null) return '0';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

function GameCard({ game }) {
  const {
    name,
    description,
    playing = 0,
    maxPlayers = 1,
    isActive = false,
    thumbnail,
    genre,
    visits = 0,
    favoritedCount = 0,
    playUrl,
  } = game;

  const fillPercent = Math.min((playing / Math.max(maxPlayers, 1)) * 100, 100);

  return (
    <article className={`game-card${!isActive ? ' game-card--offline' : ''}`}>
      {/* Thumbnail */}
      <div className="game-card__thumbnail">
        {/* Status */}
        <div
          className={`game-card__status ${
            isActive ? 'game-card__status--online' : 'game-card__status--offline'
          }`}
        >
          <span className="game-card__status-dot" />
          {isActive ? 'Online' : 'Offline'}
        </div>

        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${name} thumbnail`}
            className="game-card__thumbnail-img"
            loading="lazy"
          />
        ) : (
          <div className="game-card__thumbnail-placeholder">🎮</div>
        )}
      </div>

      {/* Content */}
      <div className="game-card__content">
        <h3 className="game-card__name">{name}</h3>

        {genre && <span className="game-card__genre">{genre}</span>}

        {/* Player Count */}
        <div className="game-card__players">
          <p className="game-card__players-text">
            <strong>{playing.toLocaleString()}</strong> / {maxPlayers.toLocaleString()} Players
          </p>
          <div className="game-card__progress-track">
            <div
              className={`game-card__progress-fill ${
                isActive
                  ? 'game-card__progress-fill--active'
                  : 'game-card__progress-fill--inactive'
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="game-card__stats">
          <div className="game-card__stat">
            <span className="game-card__stat-icon">👁️</span>
            <span className="game-card__stat-value">{formatCount(visits)}</span>
            visits
          </div>
          <div className="game-card__stat">
            <span className="game-card__stat-icon">❤️</span>
            <span className="game-card__stat-value">{formatCount(favoritedCount)}</span>
          </div>
        </div>

        {/* Button */}
        <div
          className={`game-card__btn ${
            isActive ? 'game-card__btn--active' : 'game-card__btn--inactive'
          }`}
        >
          {isActive ? (
            <a
              href={playUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Game
            </a>
          ) : (
            <button type="button" disabled>
              Offline
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default GameCard;

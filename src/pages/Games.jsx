import { useState, useEffect, useMemo } from 'react';
import PageTransition from '../components/UI/PageTransition';
import ScrollReveal from '../components/UI/ScrollReveal';
import SectionTitle from '../components/UI/SectionTitle';
import GameCard from '../components/GameCard/GameCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { fetchGames } from '../services/robloxAPI';
import './Games.css';

function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGames();
      setGames(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load games. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
  }, []);

  const summaryStats = useMemo(() => {
    const totalGames = games.length;
    const totalPlayers = games.reduce(
      (sum, game) => sum + (game.playing || 0),
      0
    );
    const activeGames = games.filter(
      (game) => (game.playing || 0) > 0
    ).length;

    return { totalGames, totalPlayers, activeGames };
  }, [games]);

  return (
    <PageTransition>
      <div className="games-page">
        <div className="container">
          <ScrollReveal>
            <SectionTitle
              title="Live Games"
              subtitle="Currently running Roblox experiences"
            />
          </ScrollReveal>

          {loading && (
            <div className="games-loading">
              <LoadingSpinner />
              <p className="games-loading__text">Loading games...</p>
            </div>
          )}

          {error && (
            <div className="games-error">
              <div className="games-error__icon">⚠️</div>
              <h3 className="games-error__title">Something went wrong</h3>
              <p className="games-error__text">{error}</p>
              <button className="games-error__retry" onClick={loadGames}>
                🔄 Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Summary Stats Bar */}
              <ScrollReveal delay={0.2}>
                <div className="games-summary">
                  <div className="games-summary__pill">
                    <span className="games-summary__label">Total Games</span>
                    <span className="games-summary__value">
                      {summaryStats.totalGames}
                    </span>
                  </div>
                  <div className="games-summary__pill">
                    <span className="games-summary__label">Players Online</span>
                    <span className="games-summary__value games-summary__value--cyan">
                      {summaryStats.totalPlayers.toLocaleString()}
                    </span>
                  </div>
                  <div className="games-summary__pill">
                    <span className="games-summary__label">Active Games</span>
                    <span className="games-summary__value games-summary__value--green">
                      {summaryStats.activeGames}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Games Grid */}
              <div className="games-grid">
                {games.map((game, index) => (
                  <ScrollReveal key={game.id || index} delay={index * 0.1}>
                    <GameCard game={game} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Auto-refresh Note */}
              <ScrollReveal delay={0.4}>
                <p className="games-refresh-note">
                  <span className="games-refresh-note__icon">🔄</span>
                  Player counts update automatically
                </p>
              </ScrollReveal>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Games;

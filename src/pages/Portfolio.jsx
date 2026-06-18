import { useState, useMemo, useEffect } from 'react';
import PageTransition from '../components/UI/PageTransition';
import ScrollReveal from '../components/UI/ScrollReveal';
import SectionTitle from '../components/UI/SectionTitle';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import FilterBar from '../components/UI/FilterBar';
import projects from '../data/projects';
import { fetchGames } from '../services/robloxAPI';
import './Portfolio.css';

const FILTER_CATEGORIES = [
  { value: 'all', label: 'All Projects' },
  { value: 'roblox', label: 'Roblox' },
  { value: 'web', label: 'Web' },
  { value: '3d', label: '3D' },
];

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveGames, setLiveGames] = useState([]);

  useEffect(() => {
    async function load() {
      const games = await fetchGames();
      // Map API games to Portfolio Project format
      const formatted = games.map(g => ({
        id: `roblox-${g.universeId}`,
        name: g.name,
        description: g.description,
        thumbnail: g.thumbnail,
        features: [
          `🟢 Playing: ${g.playing.toLocaleString()}`,
          `👥 Visits: ${g.visits.toLocaleString()}`,
          `⭐ Favorites: ${g.favoritedCount.toLocaleString()}`,
          `Genre: ${g.genre}`
        ],
        technologies: ['Roblox Lua'],
        role: g.creator,
        playUrl: g.playUrl,
        category: 'roblox',
        featured: g.playing > 0
      }));
      setLiveGames(formatted);
    }
    load();
  }, []);

  const filteredProjects = useMemo(() => {
    let result = [...(projects || []), ...liveGames];

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(
        (project) =>
          project.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (project) =>
          project.name?.toLowerCase().includes(query) ||
          project.title?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery, liveGames]);

  return (
    <PageTransition>
      <div className="portfolio-page">
        <div className="container">
          <ScrollReveal>
            <SectionTitle
              title="Portfolio"
              subtitle="Explore my latest works and projects"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <FilterBar
              categories={FILTER_CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </ScrollReveal>

          {filteredProjects.length > 0 ? (
            <div className="portfolio-grid">
              {filteredProjects.map((project, index) => (
                <ScrollReveal
                  key={project.id || index}
                  delay={index * 0.1}
                >
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="portfolio-empty">
                <div className="portfolio-empty__icon">🔍</div>
                <h3 className="portfolio-empty__title">No projects found</h3>
                <p className="portfolio-empty__text">
                  No projects found matching your criteria. Try adjusting your
                  filters or search query.
                </p>
                <button
                  className="portfolio-empty__reset"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Portfolio;

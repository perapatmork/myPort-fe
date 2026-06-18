import './ProjectCard.css';

function ProjectCard({ project }) {
  const {
    name,
    description,
    thumbnail,
    technologies = [],
    role,
    playUrl,
    category,
    featured,
  } = project;

  const isRoblox =
    category?.toLowerCase() === 'roblox' ||
    playUrl?.includes('roblox.com');

  const buttonText = isRoblox ? 'Play Now ▶' : 'View Project →';

  return (
    <article className="project-card">
      {/* Thumbnail */}
      <div className="project-card__thumbnail">
        {featured && (
          <span className="project-card__badge">Featured</span>
        )}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${name} thumbnail`}
            className="project-card__thumbnail-img"
            loading="lazy"
          />
        ) : (
          <div className="project-card__thumbnail-placeholder">
            🎮
          </div>
        )}
      </div>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__name">{name}</h3>

        {description && (
          <p className="project-card__description">{description}</p>
        )}

        {/* Tech Tags */}
        {technologies.length > 0 && (
          <ul className="project-card__tags">
            {technologies.map((tech) => (
              <li key={tech} className="project-card__tag">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Role */}
        {role && <p className="project-card__role">Role: {role}</p>}

        {/* Action Button */}
        <div className="project-card__btn">
          {playUrl ? (
            <a href={playUrl} target="_blank" rel="noopener noreferrer">
              {buttonText}
            </a>
          ) : (
            <button type="button" disabled style={{ opacity: 0.5 }}>
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;

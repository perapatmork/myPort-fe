import './SectionTitle.css';

function SectionTitle({ title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      <h2 className="section-title__heading">{title}</h2>
      <div className="section-title__line" />
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;

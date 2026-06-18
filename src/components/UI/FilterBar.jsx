import './FilterBar.css';

function FilterBar({
  categories = [],
  activeCategory,
  onCategoryChange,
  searchQuery = '',
  onSearchChange,
}) {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`filter-bar__pill ${
            activeCategory === category.value ? 'filter-bar__pill--active' : ''
          }`}
          onClick={() => onCategoryChange?.(category.value)}
        >
          {category.label}
        </button>
      ))}

      {onSearchChange && (
        <input
          type="text"
          className="filter-bar__search"
          placeholder="🔍 Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default FilterBar;

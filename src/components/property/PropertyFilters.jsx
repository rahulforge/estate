export function PropertyFilters({ filters, onChange }) {
  return (
    <div className="filters-grid card">
      <input
        placeholder="Search location"
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
      />
      <select value={filters.property_type} onChange={(e) => onChange({ ...filters, property_type: e.target.value })}>
        <option value="">All types</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot</option>
        <option value="commercial">Commercial</option>
      </select>
      <input
        placeholder="Min price"
        type="number"
        value={filters.minPrice}
        onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
      />
      <input
        placeholder="Max price"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
      />
    </div>
  );
}

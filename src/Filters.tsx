
import React from 'react';
import './Filters.css';

export type FilterState = {
  name: string;
  color: string;
 //foil: boolean | null;
};

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const colorOptions = [
  { value: '', label: 'Any' },
  { value: 'W', label: 'White' },
  { value: 'U', label: 'Blue' },
  { value: 'B', label: 'Black' },
  { value: 'R', label: 'Red' },
  { value: 'G', label: 'Green' },
  { value: 'Multicolor', label: 'Multi' },
  { value: 'Colorless', label: 'Colorless' }
];

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className="filters-container">
      <div className="filters-row">
        <div className="filter-box">
          {colorOptions.map(opt => (
            <label key={opt.value} className="filter-radio-label">
              <input
                type="radio"
                name="color"
                value={opt.value}
                checked={filters.color === opt.value}
                onChange={() => setFilters({ ...filters, color: opt.value })}
              />
              <span className="filter-radio-text">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="filters-row">
        <div className="filter-box flex">
          <label className="filter-label">Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            className="filter-input"
            onChange={e => setFilters({ ...filters, name: e.target.value })}
          />
        </div>
        {/* <div className="filter-box">
          <label className="filter-label">Foil:</label>
          <input
            type="checkbox"
            checked={!!filters.foil}
            onChange={e => setFilters({ ...filters, foil: e.target.checked ? true : null })}
          />
          <span className="filter-foil-text">Only Foil</span>
        </div> */}
      </div>
    </div>
  );
};

export default Filters;

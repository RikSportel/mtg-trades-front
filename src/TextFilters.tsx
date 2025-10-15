import React from 'react';
import './Filters.css';

interface TextFiltersProps {
  name: string;
  setName: (name: string) => void;
}

const TextFilters: React.FC<TextFiltersProps> = ({ name, setName }) => (
  <div className="filters-container" >
    <div className="filters-row">
      <div className="filter-box flex">
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="filter-input"
          style={{ width: '90px', maxWidth: '100%' }}
          onChange={e => setName(e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default TextFilters;

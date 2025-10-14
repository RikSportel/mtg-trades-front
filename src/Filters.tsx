import React from 'react';
import './Filters.css';

export type FilterState = {
  name: string;
  color: string[]; // was string
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
  { value: 'Colorless', label: 'Colorless' }
];

const svgIcons = [
  { value: 'W', svgUrl: 'https://svgs.scryfall.io/card-symbols/W.svg' },
  { value: 'U', svgUrl: 'https://svgs.scryfall.io/card-symbols/U.svg' },
  { value: 'B', svgUrl: 'https://svgs.scryfall.io/card-symbols/B.svg' },
  { value: 'R', svgUrl: 'https://svgs.scryfall.io/card-symbols/R.svg' },
  { value: 'G', svgUrl: 'https://svgs.scryfall.io/card-symbols/G.svg' },
  { value: 'Colorless', svgUrl: 'https://svgs.scryfall.io/card-symbols/C.svg' } 
]

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className="filters-container">
      <div className="filters-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <div style={{ position: 'relative', width: 96, height: 96 }}>
            {svgIcons
              .filter(icon => icon.value !== 'Colorless')
              .map((icon, i) => {
                const angle = (2 * Math.PI * i) / (svgIcons.length - 1) - Math.PI / 2;
                const radius = 36;
                const iconSize = 20;
                const x = Math.cos(angle) * radius + 48 - iconSize / 2;
                const y = Math.sin(angle) * radius + 48 - iconSize / 2;
                const isActive = filters.color.includes(icon.value);
                const colorlessActive = filters.color.includes('Colorless');
                return (
                  <img
                    key={icon.value}
                    src={icon.svgUrl}
                    alt={icon.value}
                    width={iconSize}
                    height={iconSize}
                    style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: isActive ? '0 0 10px 3px gold' : undefined,
                      cursor: 'pointer',
                      opacity: 1,
                      transition: 'box-shadow 0.2s'
                    }}
                    onClick={() => {
                      let newColors;
                      if (isActive) {
                        newColors = filters.color.filter(c => c !== icon.value);
                      } else {
                        // If colorless is active, remove it when selecting a color
                        newColors = colorlessActive
                          ? [icon.value]
                          : [...filters.color, icon.value];
                      }
                      setFilters({
                        ...filters,
                        color: newColors
                      });
                    }}
                  />
                );
              })}

            {/* Place Colorless in the center */}
            {(() => {
              const colorless = svgIcons.find(icon => icon.value === 'Colorless');
              if (!colorless) return null;
              const iconSize = 24;
              const isActive = filters.color.includes(colorless.value);
              return (
                <img
                  key={colorless.value}
                  src={colorless.svgUrl}
                  alt={colorless.value}
                  width={iconSize}
                  height={iconSize}
                  style={{
                    position: 'absolute',
                    left: 48 - iconSize / 2,
                    top: 48 - iconSize / 2,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: isActive ? '0 0 10px 3px gold' : undefined,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s'
                  }}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      color: isActive ? [] : ['Colorless']
                    });
                  }}
                />
              );
            })()}
          </div>
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

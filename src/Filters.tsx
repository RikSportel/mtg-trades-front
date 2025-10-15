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

const svgIcons = [
  { value: 'W', svgUrl: 'https://svgs.scryfall.io/card-symbols/W.svg', shadowColor: 'Gold' },
  { value: 'U', svgUrl: 'https://svgs.scryfall.io/card-symbols/U.svg', shadowColor: 'CornflowerBlue' },
  { value: 'B', svgUrl: 'https://svgs.scryfall.io/card-symbols/B.svg', shadowColor: 'DarkGray' },
  { value: 'R', svgUrl: 'https://svgs.scryfall.io/card-symbols/R.svg', shadowColor: 'IndianRed' },
  { value: 'G', svgUrl: 'https://svgs.scryfall.io/card-symbols/G.svg', shadowColor: 'MediumSeaGreen' },
  { value: 'Colorless', svgUrl: 'https://svgs.scryfall.io/card-symbols/C.svg', shadowColor: 'SlateGray' } 
]

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  // Responsive wheel size
  const wheelSize = window.innerWidth < 600 ? 64 : 96;
  const wheelRadius = wheelSize / 2 - 12;
  const iconSize = window.innerWidth < 600 ? 14 : 20;
  
  return (
    <div className="filters-container" style={{ position: 'fixed', top: 12, left: 12, zIndex: 1000, padding: 8, minWidth: wheelSize, minHeight: wheelSize }}>
      <div className="filters-row">
        <div>
          <div style={{ position: 'relative', width: wheelSize, height: wheelSize }}>
            {svgIcons
              .filter(icon => icon.value !== 'Colorless')
              .map((icon, i) => {
                const angle = (2 * Math.PI * i) / (svgIcons.length - 1) - Math.PI / 2;
                const radius = wheelRadius;
                const x = Math.cos(angle) * radius + wheelSize / 2 - iconSize / 2;
                const y = Math.sin(angle) * radius + wheelSize / 2 - iconSize / 2;
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
                      boxShadow: isActive ? `0 0 10px 3px ${icon.shadowColor}` : undefined,
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
                    left: wheelSize / 2 - iconSize / 2,
                    top: wheelSize / 2 - iconSize / 2,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: isActive ? `0 0 10px 3px ${colorless.shadowColor}` : undefined,
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
          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            className="filter-input"
            style={{ width: '90px', maxWidth: '100%' }}
            onChange={e => setFilters({ ...filters, name: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;

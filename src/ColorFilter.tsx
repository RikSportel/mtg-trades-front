import React from 'react';
import './Filters.css';

export type ColorFilterState = {
  color: string[];
};

interface ColorFilterProps {
  color: string[];
  setColor: (color: string[]) => void;
}

const svgIcons = [
  { value: 'W', svgUrl: 'https://svgs.scryfall.io/card-symbols/W.svg', shadowColor: 'Gold' },
  { value: 'U', svgUrl: 'https://svgs.scryfall.io/card-symbols/U.svg', shadowColor: 'SkyBlue' },
  { value: 'B', svgUrl: 'https://svgs.scryfall.io/card-symbols/B.svg', shadowColor: 'DarkGrey' },
  { value: 'R', svgUrl: 'https://svgs.scryfall.io/card-symbols/R.svg', shadowColor: 'IndianRed' },
  { value: 'G', svgUrl: 'https://svgs.scryfall.io/card-symbols/G.svg', shadowColor: 'MediumSeaGreen' },
  { value: 'Colorless', svgUrl: 'https://svgs.scryfall.io/card-symbols/C.svg', shadowColor: 'SlateGray' }
];

const ColorFilter: React.FC<ColorFilterProps> = ({ color, setColor }) => {
  const wheelSize = window.innerWidth < 600 ? 50 : 80;
  const wheelRadius = wheelSize / 2 - 12;
  const iconSize = window.innerWidth < 600 ? 10 : 16;
  return (
    <div className="color-filters-container" style={{ width: wheelSize, height: wheelSize }}>
        {svgIcons
            .filter(icon => icon.value !== 'Colorless')
            .map((icon, i) => {
            const angle = (2 * Math.PI * i) / (svgIcons.length - 1) - Math.PI / 2;
            const radius = wheelRadius;
            const x = Math.cos(angle) * radius + wheelSize / 2 - iconSize / 2;
            const y = Math.sin(angle) * radius + wheelSize / 2 - iconSize / 2;
            const isActive = color.includes(icon.value);
            const colorlessActive = color.includes('Colorless');
            return (
                <img
                key={icon.value}
                src={icon.svgUrl}
                alt={icon.value}
                width={iconSize}
                height={iconSize}
                style={{
                    position: 'absolute',
                    left: x + 6,
                    top: y + 6,
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
                    newColors = color.filter(c => c !== icon.value);
                    } else {
                    newColors = colorlessActive ? [icon.value] : [...color, icon.value];
                    }
                    setColor(newColors);
                }}
                />
            );
            })}
        {(() => {
            const colorless = svgIcons.find(icon => icon.value === 'Colorless');
            if (!colorless) return null;
            const isActive = color.includes(colorless.value);
            return (
            <img
                key={colorless.value}
                src={colorless.svgUrl}
                alt={colorless.value}
                width={iconSize}
                height={iconSize}
                style={{
                position: 'absolute',
                left: (wheelSize / 2 - iconSize / 2) + 6,
                top: (wheelSize / 2 - iconSize / 2) + 6,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: isActive ? `0 0 10px 3px ${colorless.shadowColor}` : undefined,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
                }}
                onClick={() => {
                setColor(isActive ? [] : ['Colorless']);
                }}
            />
            );
        })()}
    </div>
  );
};

export default ColorFilter;

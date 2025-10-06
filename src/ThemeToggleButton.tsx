import React from 'react';

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark';
  onClick: () => void;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'fixed',
      top: 16,
      right: 16,
      width: 20,
      height: 20,
      padding: 0,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      zIndex: 1000,
    }}
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? (
      // Sun icon for light mode
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="5" fill="#cccccc" />
        <g stroke="#cccccc" strokeWidth="1">
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="10" y1="16" x2="10" y2="19" />
          <line x1="1" y1="10" x2="4" y2="10" />
          <line x1="16" y1="10" x2="19" y2="10" />
          <line x1="3.89" y1="3.89" x2="5.96" y2="5.96" />
          <line x1="14.04" y1="14.04" x2="16.11" y2="16.11" />
          <line x1="3.89" y1="16.11" x2="5.96" y2="14.04" />
          <line x1="14.04" y1="5.96" x2="16.11" y2="3.89" />
        </g>
      </svg>
    ) : (
      // Moon icon for dark mode
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6" fill="#ccc" />
        <circle cx="13" cy="7" r="4.8" fill="#fff" />
      </svg>
    )}
  </button>
);

export default ThemeToggleButton;

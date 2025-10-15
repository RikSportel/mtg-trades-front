import React, { useEffect, useState } from 'react';
import './App.css';
import mtgIcon from './mtg.png';
import TradePage from './TradePage';
import ThemeToggleButton from './ThemeToggleButton';

const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored : getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      <ThemeToggleButton theme={theme === 'dark' ? 'dark' : 'light'} onClick={toggleTheme} />
      <img
        src={mtgIcon}
        alt="MTG Icon"
        width={64}
        height={64}
        style={{
          borderRadius: '50%',
          position: 'fixed',
          top: '5px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      />
      <TradePage 
        style={{
          width: '100%',
          position: 'fixed',
          bottom: '0',
          height: 'calc(100vh - 110px)',
          overflowY: 'auto',
        }}
      />  
    </div>
  );
}

export default App;
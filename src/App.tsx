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
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ThemeToggleButton theme={theme === 'dark' ? 'dark' : 'light'} onClick={toggleTheme} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div className="headerdiv" style={{ width: 128, height: 128, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={mtgIcon} alt="MTG Icon" width={128} height={128} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      </div>
      <div style={{ flex: 1, width: '100%' }}>
        <TradePage />
      </div>
    </div>
  );
}

export default App;
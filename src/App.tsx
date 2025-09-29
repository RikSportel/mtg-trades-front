import React from 'react';
import './App.css';
import mtgIcon from './mtg.png';
import ForTrade from './ForTrade';
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ width: 128, height: 128, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
          <img src={mtgIcon} alt="MTG Icon" width={128} height={128} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      </div>
      <div style={{ flex: 1, width: '100%' }}>
        <ForTrade />
      </div>
    </div>
  );
}

export default App;
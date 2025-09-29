import React, { useState } from 'react';
import './Card.css';

interface CardProps {
  imageUrl?: string;
  name?: string;
  price?: string | number;
  amount?: number;
  foil?: boolean;
}

const CARD_HEIGHT = 250; // Further reduced height for card

const Card: React.FC<CardProps> = ({ imageUrl, name, price, amount, foil }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="card-container">
        <div
          className={`card-image${imageUrl ? '' : ' no-pointer'}`}
          onClick={() => imageUrl && setShowPopup(true)}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name || 'Card'}
              style={{ width: '100%', height: '100%', objectFit: 'contain', aspectRatio: '488 / 680', display: 'block' }}
            />
          ) : (
            <span style={{ color: '#aaa' }}>No Image</span>
          )}
        </div>
        <div className="card-name">{name || 'Name'}</div>
        <div className="card-price">{price !== undefined ? `€${price}` : 'Price'}</div>
        <div className="card-amount"><span>Amount available: {amount !== undefined ? amount : '-'}</span></div>
        <div className={`card-foil${foil ? '' : ' invisible'}`}>{foil ? 'Foil' : ''}</div>
      </div>
      {showPopup && imageUrl && (
        <div className="card-popup" onClick={() => setShowPopup(false)}>
          <div className="card-popup-inner" onClick={e => e.stopPropagation()}>
            <button className="card-popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
              &#10005;
            </button>
            <img className="card-popup-img" src={imageUrl} alt={name || 'Card'} />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

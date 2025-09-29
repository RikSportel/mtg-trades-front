import React, { useState } from 'react';

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
      <div style={{   
        background: '#fff',
        borderRadius: '16px',
        border: '2px solid #ccc',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        padding: '12px',
        width: '140px',
        height: `${CARD_HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '4px',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
        fontSize: '0.75em', // <-- reduce font size for all text
      }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '488 / 680',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '8px',
            background: '#fff',
            cursor: imageUrl ? 'pointer' : 'default', // indicate clickable
          }}
          onClick={() => imageUrl && setShowPopup(true)}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name || 'Card'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                aspectRatio: '488 / 680',
                display: 'block',
              }}
            />
          ) : (
            <span style={{ color: '#aaa' }}>No Image</span>
          )}
        </div>
        <div
          style={{
            marginTop: '12px',
            fontWeight:   'bold',
            fontSize: '0.75em', // <-- reduced from 1em
            color: '#333',
            width: '100%',
            textAlign: 'center',
            minHeight: '2.6em',
            maxHeight: '2.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.3em',
            whiteSpace: 'normal',
          }}
        >
          {name || 'Name'}
        </div>
        <div style={{ marginTop: '4px', color: '#666', fontSize: '0.7em' }}>{price !== undefined ? `€${price}` : 'Price'}</div>
        <div style={{ marginTop: '4px', color: '#666', fontSize: '0.7em' }}>
          <span>Amount available: {amount !== undefined ? amount : '-'}</span>
        </div>
        <div
          style={{
            marginTop: '4px',
            fontWeight: 'bold',
            color: foil ? '#6a1b9a' : 'transparent',
            fontSize: '0.7em', // <-- reduced from 0.95em
            minHeight: '1.2em',
            height: '1.2em',
            textAlign: 'center',
            transition: 'color 0.2s',
          }}
        >
          {foil ? 'Foil' : ''}
        </div>
      </div>
      {showPopup && imageUrl && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '12px',
              padding: '24px 32px', // increased horizontal padding
              boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '340px', // wider than card
              maxWidth: '90vw',
            }}
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'transparent',
                border: 'none',
                fontSize: '0.85em', // reduced from 1.7em
                cursor: 'pointer',
                color: '#333',
              }}
              onClick={() => setShowPopup(false)}
              aria-label="Close"
            >
              &#10005;
            </button>
            <img
              src={imageUrl}
              alt={name || 'Card'}
              style={{
                maxWidth: '80vw',
                maxHeight: '80vh',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

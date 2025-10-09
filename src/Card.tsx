import React, { useState } from 'react';
import './Card.css';

interface CardProps {
  imageUrl?: string;
  name?: string;
  foilPrice?: string | number;
  price?: string | number;
  cardData?: any;
}

const Card: React.FC<CardProps> = ({ imageUrl, name, foilPrice, price, cardData }) => {
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
        <table className="card-table">
          <thead>
            <tr>
              <th>Treatment</th>
              <th>Price</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cardData) && cardData.length > 0 ? (
              cardData.map((entry: any, idx: number) => {
          let priceValue = 'n/a';
          if (entry.finish === 'foil') priceValue = foilPrice !== undefined ? `€${foilPrice}` : 'n/a';
          else if (entry.finish === 'nonfoil') priceValue = price !== undefined ? `€${price}` : 'n/a';
          else if (entry.finish === 'etched') priceValue = 'n/a';

          return (
            <tr key={idx}>
              <td>{entry.finish}</td>
              <td>{priceValue}</td>
              <td>{entry.amount}</td>
            </tr>
          );
              })
            ) : (
              <tr>
          <td colSpan={4}>No Card Data</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      {showPopup && imageUrl && (
        <div className="card-popup" onClick={() => setShowPopup(false)}>
          <div className="card-popup-inner" onClick={e => e.stopPropagation()}>
            <button className="card-popup-close" onClick={() => setShowPopup(false)} aria-label="Close">
              &#10005;
            </button>
            <img className="card-popup-img" src={imageUrl} alt={name || 'Card'} />
            <table className="card-popup-notes">
              <thead>
                <tr>
                  <th colSpan={2} style={{ textAlign: 'center' }}>Notes:</th>
                </tr>
              </thead>
              <tbody>

                  {Array.isArray(cardData) && cardData.length > 0 ? (
                    cardData.map((obj: any, idx: number) => (
                      <React.Fragment key={idx}>
                        <tr>
                        <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>{obj.finish}:</td>
                        <td>{obj.notes || ''}</td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <><tr>
                      <td colSpan={2}>No Card Data</td>
                      </tr>
                    </>
                  )}
                
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

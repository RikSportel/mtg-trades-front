
import React from 'react';
import Card from './Card';
import './ForTrade.css';

type CardType = {
  imageUrl?: string;
  name?: string;
  foilPrice?: string;
  price?: string;
  cardData?: any;
};

interface ForTradeProps {
  cards: CardType[];
  loading: boolean;
}

const ForTrade: React.FC<ForTradeProps> = ({ cards, loading }) => {
  return (
    <div className="fortrade-container">
      {loading ? (
        <div className="fortrade-loading">Loading...</div>
      ) : (
        <>
          {cards.map((card, idx) => (
            <Card
              key={idx}
              imageUrl={card.imageUrl}
              name={card.name}
              foilPrice={card.foilPrice}
              price={card.price}
              cardData={card.cardData}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ForTrade;

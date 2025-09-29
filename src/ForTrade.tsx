import React, { useEffect, useState } from 'react';
import Card from './Card';

function ForTrade() {
  const [cards, setCards] = useState<
    { imageUrl?: string; name?: string; price?: string; amount?: number; foil?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/cards')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched cards:', data);
        // data is an object with keys like "setcode:cardnumber:foil"
        const mappedCards = Object.values(data).map((card: any) => {
          const scryfall = card.scryfall || {};
          return {
            imageUrl: scryfall.image_uris?.normal,
            name: scryfall.name,
            price: scryfall.prices?.eur_foil,
            amount: card.amount,
            foil: !!card.foil,
            colors: scryfall.colors || [],
          };
        });

        // Sorting logic
        const colorOrder = ['W', 'U', 'B', 'R', 'G'];
        function getColorCategory(colors: string[]) {
          if (!colors || colors.length === 0) return 2; // colorless
          if (colors.length === 1 && colorOrder.includes(colors[0])) return 0; // single color
          if (colors.length > 1) return 1; // multicolor
          return 2; // fallback to colorless
        }

        mappedCards.sort((a, b) => {
          const aCat = getColorCategory(a.colors);
          const bCat = getColorCategory(b.colors);
          if (aCat !== bCat) return aCat - bCat;
          // If both are single color, sort by color order
          if (aCat === 0 && bCat === 0) {
            return colorOrder.indexOf(a.colors[0]) - colorOrder.indexOf(b.colors[0]);
          }
          // If both are multicolor or colorless, sort by name
          const aName = (a.name || '').toLowerCase();
          const bName = (b.name || '').toLowerCase();
          return aName.localeCompare(bName);
        });
        
        setCards(mappedCards);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px' // Reduced gap
      }}
    >
      {loading ? (
        <div style={{ color: '#fff' }}>Loading...</div>
      ) : (
        <>
          {cards.map((card, idx) => (
            <Card
              key={idx}
              imageUrl={card.imageUrl}
              name={card.name}
              price={card.price}
              amount={card.amount}
              foil={card.foil}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ForTrade;

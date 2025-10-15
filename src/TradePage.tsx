import React, { CSSProperties, useEffect, useState } from 'react';
import ColorFilter from './ColorFilter';
import TextFilters from './TextFilters';
import ForTrade from './ForTrade';

interface TradePageProps {
  style?: CSSProperties;
}

const TradePage: React.FC<TradePageProps> = ({ style }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MTG_BACKEND_API_URL}/cards`)
      .then(res => res.json())
      .then(data => {
        const mappedCards = Object.values(data).map((card: any) => {
          const scryfall = card.scryfall || {};
          return {
            imageUrl: scryfall.image_uris?.normal,
            name: scryfall.name,
            foilPrice: scryfall.prices?.eur_foil,
            price: scryfall.prices?.eur,
            colors: scryfall.colors || [],
            cardData: card.finishes
          };
        });
        setCards(mappedCards);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  const colorOrder = ['W', 'U', 'B', 'R', 'G'];
  function getColorCategory(colors: string[]) {
    if (!colors || colors.length === 0) return 2; // colorless
    if (colors.length === 1 && colorOrder.includes(colors[0])) return 0; // single color
    if (colors.length > 1) return 1; // multicolor
    return 2; // fallback to colorless
  }

  const filteredCards = cards
    .filter(card => {
      if (name && !card.name?.toLowerCase().includes(name.toLowerCase())) return false;
      if (color && color.length > 0) {
        if (color.includes('Colorless')) {
          if (card.colors && card.colors.length > 0) return false;
        }
        if (color.includes('Multicolor')) {
          if (!card.colors || card.colors.length <= 1) return false;
        }
        const selectedColors = color.filter(c => ['W','U','B','R','G'].includes(c));
        if (selectedColors.length > 0) {
          if (!card.colors || !selectedColors.every(c => card.colors.includes(c))) return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      const aCat = getColorCategory(a.colors);
      const bCat = getColorCategory(b.colors);
      if (aCat !== bCat) return aCat - bCat;
      if (aCat === 0 && bCat === 0) {
        return colorOrder.indexOf(a.colors[0]) - colorOrder.indexOf(b.colors[0]);
      }
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      return aName.localeCompare(bName);
    });

  return (
    <div style={style}>
      <ColorFilter color={color} setColor={setColor} />
      <TextFilters name={name} setName={setName} />
      <ForTrade cards={filteredCards} loading={loading} />
    </div>
  );
};

export default TradePage;

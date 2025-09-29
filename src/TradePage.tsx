import React, { useEffect, useState } from 'react';
import Filters, { FilterState } from './Filters';
import ForTrade from './ForTrade';

const TradePage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({ name: '', color: '', foil: null });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MTG_BACKEND_API_URL}/cards`)
      .then(res => res.json())
      .then(data => {
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
        setCards(mappedCards);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cards:', err);
        setLoading(false);
      });
  }, []);

  // Filtering logic
  const colorOrder = ['W', 'U', 'B', 'R', 'G'];
  function getColorCategory(colors: string[]) {
    if (!colors || colors.length === 0) return 2; // colorless
    if (colors.length === 1 && colorOrder.includes(colors[0])) return 0; // single color
    if (colors.length > 1) return 1; // multicolor
    return 2; // fallback to colorless
  }

  const filteredCards = cards
    .filter(card => {
      if (filters.name && !card.name?.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.color) {
        if (filters.color === 'Multicolor' && (!card.colors || card.colors.length <= 1)) return false;
        if (filters.color === 'Colorless' && card.colors && card.colors.length > 0) return false;
        if (['W','U','B','R','G'].includes(filters.color) && (!card.colors || card.colors[0] !== filters.color || card.colors.length !== 1)) return false;
      }
      if (filters.foil !== null && card.foil !== filters.foil) return false;
      return true;
    })
    .sort((a, b) => {
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

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <ForTrade cards={filteredCards} loading={loading} />
    </div>
  );
};

export default TradePage;

// FIX: Rewrote as a TypeScript module with JSX and strong types for context, resolving module and typing errors.
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { characters } from '../data/characters.ts';
import { arcs } from '../data/arcs.ts';
import { eyes } from '../data/eyes.ts';
import { clans } from '../data/clans.ts';

const FavoritesContext = createContext(undefined);

const initialFavorites = {
  characters: [],
  arcs: [],
  eyes: [],
  clans: [],
};

// FIX: Corrected the component to return a ReactNode, as required by React.FC. The original implementation had an empty or void-returning function body.
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem('naruto-favorites');
      return item ? JSON.parse(item) : initialFavorites;
    } catch (error) {
      console.error(error);
      return initialFavorites;
    }
  });

  useEffect(() => {
    window.localStorage.setItem('naruto-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((item, category) => {
    setFavorites(prev => {
      const categoryFavorites = prev[category];
      const isCurrentlyFavorite = categoryFavorites.includes(item.id);
      const newCategoryFavorites = isCurrentlyFavorite
        ? categoryFavorites.filter(id => id !== item.id)
        : [...categoryFavorites, item.id];
      return { ...prev, [category]: newCategoryFavorites };
    });
  }, []);

    const isFavorite = useCallback((id, category) => {
        return favorites[category].includes(id);
    }, [favorites]);

    const getFavoriteItems = useCallback(() => {
        return {
            characters: characters.filter(c => favorites.characters.includes(c.id)),
            arcs: arcs.filter(a => favorites.arcs.includes(a.id)),
            eyes: eyes.filter(e => favorites.eyes.includes(e.id)),
            clans: clans.filter(c => favorites.clans.includes(c.id)),
        };
    }, [favorites]);

  // FIX: Converted JSX to React.createElement to be valid in a .ts file, resolving parsing errors and fulfilling the component's contract to return a ReactNode.
  return React.createElement(
    FavoritesContext.Provider,
    { value: { favorites, toggleFavorite, isFavorite, getFavoriteItems } },
    children
  );
};

// FIX: Exported the `useFavorites` hook. It was not exported, causing `Module has no exported member` errors in multiple page components.
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
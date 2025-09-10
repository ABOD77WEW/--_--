import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FavoriteItem, FavoriteCategory } from '../types';
import { characters } from '../data/characters';
import { arcs } from '../data/arcs';
import { eyes } from '../data/eyes';
import { clans } from '../data/clans';

interface FavoritesState {
  characters: number[];
  arcs: number[];
  eyes: number[];
  clans: number[];
}

interface FavoritesContextType {
  favorites: FavoritesState;
  toggleFavorite: (item: FavoriteItem, category: FavoriteCategory) => void;
  isFavorite: (id: number, category: FavoriteCategory) => boolean;
  getFavoriteItems: () => { [key in FavoriteCategory]: FavoriteItem[] };
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const initialFavorites: FavoritesState = {
  characters: [],
  arcs: [],
  eyes: [],
  clans: [],
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoritesState>(() => {
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

  const toggleFavorite = useCallback((item: FavoriteItem, category: FavoriteCategory) => {
    setFavorites(prev => {
      const categoryFavorites = prev[category];
      const isCurrentlyFavorite = categoryFavorites.includes(item.id);
      const newCategoryFavorites = isCurrentlyFavorite
        ? categoryFavorites.filter(id => id !== item.id)
        : [...categoryFavorites, item.id];
      return { ...prev, [category]: newCategoryFavorites };
    });
  }, []);

  const isFavorite = useCallback((id: number, category: FavoriteCategory) => {
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

  // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
  // This resolves all parsing errors related to using JSX syntax in a non-JSX file.
  return React.createElement(
    FavoritesContext.Provider,
    { value: { favorites, toggleFavorite, isFavorite, getFavoriteItems } },
    children
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

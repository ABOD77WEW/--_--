// FIX: Rewrote as a TypeScript module with JSX and strong types for context, resolving module and typing errors.
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { characters } from '../data/characters';
import { arcs } from '../data/arcs';
import { eyes } from '../data/eyes';
import { clans } from '../data/clans';
import { FavoriteCategory, FavoriteItem, Character, Arc, Eye, Clan } from '../types';

interface Favorites {
    characters: number[];
    arcs: number[];
    eyes: number[];
    clans: number[];
}

interface FavoritesContextType {
    favorites: Favorites;
    toggleFavorite: (item: FavoriteItem, category: FavoriteCategory) => void;
    isFavorite: (id: number, category: FavoriteCategory) => boolean;
    getFavoriteItems: () => {
        characters: Character[];
        arcs: Arc[];
        eyes: Eye[];
        clans: Clan[];
    };
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const initialFavorites: Favorites = {
  characters: [],
  arcs: [],
  eyes: [],
  clans: [],
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorites>(() => {
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
      return { ...prev, [category]: new
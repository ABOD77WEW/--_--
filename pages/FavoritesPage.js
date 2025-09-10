import React, { useMemo } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';
import * as ReactRouterDOM from 'react-router-dom';

const FavoriteItemCard = ({ item, category }) => {
  const { toggleFavorite } = useFavorites();

  const getDetails = () => {
    switch (category) {
      case 'characters':
        return { display: React.createElement('span', { className: "text-5xl", role: "img" }, item.emoji), subtitle: item.village };
      case 'arcs':
        return { display: React.createElement('span', { className: "text-5xl", role: "img" }, item.emoji), subtitle: item.episodeRange };
      case 'eyes':
        const SvgIcon = item.svg;
        return { display: React.createElement(SvgIcon, { className: "w-full h-full p-4" }), subtitle: 'دوجتسو' };
      case 'clans':
        const Symbol = item.symbol;
        return { display: React.createElement(Symbol, { className: "w-full h-full p-6 text-gray-700 dark:text-gray-300" }), subtitle: 'عشيرة / منظمة' };
      default:
        return { display: '❓', subtitle: '' };
    }
  };

  const { display, subtitle } = getDetails();

  return React.createElement(
    'div',
    { className: "relative group overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg" },
    React.createElement(
      'div',
      { className: "h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-700/50" },
      display
    ),
    React.createElement(
      'div',
      { className: "p-4" },
      React.createElement('h3', { className: "font-bold font-cairo text-lg truncate" }, item.name),
      React.createElement('p', { className: "text-sm text-gray-500 dark:text-gray-400 truncate" }, subtitle)
    ),
    React.createElement(
      'button',
      {
        onClick: () => toggleFavorite(item, category),
        className: "absolute top-2 left-2 p-1.5 rounded-full bg-black/50 hover:bg-red-700/80 transition-colors",
        title: "إزالة من المفضلة"
      },
      React.createElement(
        'svg',
        { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-yellow-400", viewBox: "0 0 20 20", fill: "currentColor" },
        React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
      )
    )
  );
};

const FavoritesSection = ({ title, items, category }) => {
  if (items.length === 0) return null;

  return React.createElement(
    'section',
    { className: "mb-12" },
    React.createElement('h2', { className: "font-cairo text-3xl font-bold border-b-2 border-amber-500 dark:border-red-500 pb-2 mb-6" }, title),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" },
      items.map(item => React.createElement(FavoriteItemCard, { key: `${category}-${item.id}`, item: item, category: category }))
    )
  );
};

const FavoritesPage = () => {
  const { getFavoriteItems } = useFavorites();
  const favoriteItems = useMemo(() => getFavoriteItems(), [getFavoriteItems]);
  
  const totalFavorites = Object.values(favoriteItems).reduce((sum, items) => sum + items.length, 0);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', { className: "font-cairo text-4xl font-bold text-center mb-8" }, "مفضلتي"),
    totalFavorites === 0 ? (
      React.createElement(
        'div',
        { className: "text-center py-20" },
        React.createElement('p', { className: "text-xl text-gray-500 mb-4" }, "قائمة مفضلاتك فارغة."),
        React.createElement('p', { className: "text-gray-400" }, "يمكنك إضافة العناصر عبر الضغط على أيقونة النجمة ⭐."),
        React.createElement(
          ReactRouterDOM.Link,
          { to: "/characters", className: "mt-6 inline-block bg-amber-600 hover:bg-amber-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors" },
          "تصفح الشخصيات"
        )
      )
    ) : (
      React.createElement(
        React.Fragment,
        null,
        React.createElement(FavoritesSection, { title: "الشخصيات المفضلة", items: favoriteItems.characters, category: "characters" }),
        React.createElement(FavoritesSection, { title: "الآركات المفضلة", items: favoriteItems.arcs, category: "arcs" }),
        React.createElement(FavoritesSection, { title: "العيون المفضلة", items: favoriteItems.eyes, category: "eyes" }),
        React.createElement(FavoritesSection, { title: "العشائر والمنظمات المفضلة", items: favoriteItems.clans, category: "clans" })
      )
    )
  );
};

export default FavoritesPage;

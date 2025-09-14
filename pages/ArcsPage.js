import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs.js';
import { useFavorites } from '../hooks/useFavorites.js';
import GlobalSearchBar from '../components/GlobalSearchBar.js';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

const FavoriteButton = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return React.createElement(
    'button',
    {
      onClick: (e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item, category); },
      className: `z-20 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`,
      "aria-label": "إضافة للمفضلة"
    },
    React.createElement(
      'svg',
      { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
      React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  );
};

const ArcCard = ({ arc }) => {
  const { openDetailView } = useShinobiPro();
  
  return React.createElement(
    'div',
    {
      onClick: () => openDetailView(arc, 'arcs'),
      className: "cursor-pointer relative group overflow-hidden rounded-lg themed-card shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 flex flex-col text-center p-4"
    },
    React.createElement('div', { className: "absolute -inset-2 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg" }),
    React.createElement(
        'div',
        { className: "relative z-10 w-full h-full flex flex-col" },
        React.createElement(FavoriteButton, { item: arc, category: "arcs", className: "absolute top-0 right-0" }),
        React.createElement(
          'div',
          { className: "w-full h-full flex flex-col" },
            React.createElement(
              'div',
              { className: "flex-grow flex items-center justify-center py-6" },
              React.createElement('span', { className: "text-8xl", role: "img", "aria-label": arc.name }, arc.emoji)
            ),
            React.createElement(
              'div',
              { className: "mt-auto" },
              React.createElement('h3', { className: "text-lg font-bold font-cairo truncate" }, arc.name),
              React.createElement('p', { className: "text-sm text-gray-400 font-mono tracking-wider" }, arc.episodeRange)
            )
        )
    )
  );
};

const ArcsPage = () => {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', { className: "font-cairo text-4xl font-black text-center mb-2" }, "آركات قصة ناروتو"),
    React.createElement('p', { className: "text-center text-gray-400 mb-8" }, "تتبع رحلة ناروتو وأصدقائه عبر الأحداث والمغامرات."),
    React.createElement(
      'div',
      { className: "max-w-xl mx-auto mb-8" },
      React.createElement(GlobalSearchBar)
    ),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" },
      arcs.map(arc => React.createElement(ArcCard, { key: arc.id, arc: arc }))
    )
  );
};

export default ArcsPage;
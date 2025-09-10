import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { clans } from '../data/clans.js';
import { useFavorites } from '../hooks/useFavorites.js';
import GlobalSearchBar from '../components/GlobalSearchBar.js';
import FullScreenDetailView from '../components/FullScreenDetailView.js';

const FavoriteButton = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);
  
  return React.createElement(
    'button',
    {
      onClick: (e) => { e.stopPropagation(); toggleFavorite(item, category); },
      className: `z-20 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 ${className}`,
      "aria-label": "إضافة للمفضلة"
    },
    React.createElement(
      'svg',
      { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
      React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  );
};

const ClanCard = ({ clan, onSelect }) => {
  const Symbol = clan.symbol;
  return React.createElement(
    'div',
    {
      onClick: onSelect,
      className: "relative group p-6 rounded-lg themed-card shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 cursor-pointer"
    },
    React.createElement(FavoriteButton, { item: clan, category: "clans", className: "absolute top-4 right-4" }),
    React.createElement(
      'div',
      { className: "w-24 h-24 mb-4 flex-shrink-0" },
      React.createElement(Symbol, { className: "w-full h-full text-gray-300 transition-colors duration-300 group-hover:text-red-500" })
    ),
    React.createElement(
      'div',
      { className: "flex-grow" },
      React.createElement('h3', { className: "text-2xl font-bold font-cairo mb-2" }, clan.name),
      React.createElement('p', { className: "text-sm text-gray-400 font-tajawal line-clamp-3" }, clan.history)
    )
  );
};

const ClanDetails = ({ clan }) => {
  const Symbol = clan.symbol;
  return React.createElement(
    'div',
    { className: "w-full text-right p-4" },
    React.createElement(FavoriteButton, { item: clan, category: "clans", className: "absolute top-6 left-6 !p-3" }),
    React.createElement(
      'div',
      { className: "flex flex-col md:flex-row items-center md:items-start md:text-right gap-6 mb-6" },
      React.createElement(
        'div',
        { className: "w-32 h-32 flex-shrink-0 bg-gray-900/50 rounded-lg p-4 border-2 border-gray-700" },
        React.createElement(Symbol, { className: "w-full h-full text-red-400", style: { filter: 'drop-shadow(0 0 8px currentColor)' } })
      ),
      React.createElement(
        'div',
        { className: "flex-grow text-center md:text-right" },
        React.createElement('h2', { className: "font-cairo text-4xl font-bold mb-2" }, clan.name),
        React.createElement('p', { className: "text-gray-400" }, clan.history)
      )
    ),
    React.createElement(
      'div',
      { className: "space-y-4" },
      React.createElement(
        'div',
        null,
        React.createElement('h4', { className: "font-bold text-xl mb-2 border-b-2 border-gray-700 pb-1" }, "ملخص:"),
        React.createElement('p', { className: "text-gray-300" }, clan.summary)
      ),
      React.createElement(
        'div',
        null,
        React.createElement('h4', { className: "font-bold text-xl mb-2 border-b-2 border-gray-700 pb-1" }, "أبرز الأعضاء:"),
        React.createElement(
          'div',
          { className: "flex flex-wrap gap-2 justify-center md:justify-start" },
          clan.members.map(member => React.createElement('span', { key: member, className: "px-3 py-1 bg-red-900/50 text-red-300 text-sm font-semibold rounded-full" }, member))
        )
      )
    )
  );
};

const ClansPage = () => {
    const [selectedClan, setSelectedClan] = useState(null);
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
      const selectedId = location.state?.selectedId;
      if (typeof selectedId === 'number') {
        const clan = clans.find(c => c.id === selectedId);
        if (clan) {
          setSelectedClan(clan);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }, [location.state, navigate]);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', { className: "font-cairo text-4xl font-black text-center mb-2" }, "العشائر والمنظمات"),
    React.createElement('p', { className: "text-center text-gray-400 mb-8" }, "استكشف القوى والتجمعات التي شكلت عالم النينجا."),
    React.createElement(
      'div',
      { className: "max-w-xl mx-auto mb-8" },
      React.createElement(GlobalSearchBar)
    ),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
      clans.map(clan => React.createElement(ClanCard, { key: clan.id, clan: clan, onSelect: () => setSelectedClan(clan) }))
    ),
    React.createElement(
      FullScreenDetailView,
      { show: !!selectedClan, onClose: () => setSelectedClan(null) },
      selectedClan && React.createElement(ClanDetails, { clan: selectedClan })
    )
  );
};

export default ClansPage;

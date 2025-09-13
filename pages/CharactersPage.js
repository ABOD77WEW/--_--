import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.js';
import { useFavorites } from '../hooks/useFavorites.js';
import GlobalSearchBar from '../components/GlobalSearchBar.js';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

import FireIcon from '../components/icons/techniques/FireIcon.js';
import WaterIcon from '../components/icons/techniques/WaterIcon.js';
import EarthIcon from '../components/icons/techniques/EarthIcon.js';
import LightningIcon from '../components/icons/techniques/LightningIcon.js';
import WindIcon from '../components/icons/techniques/WindIcon.js';
import SpecialIcon from '../components/icons/techniques/SpecialIcon.js';


const TechniqueIconMapper = ({ technique }) => {
    switch (technique) {
      case '🔥': return React.createElement('span', { title: "Katon" }, React.createElement(FireIcon, { className: "w-full h-full text-orange-400" }));
      case '💧': return React.createElement('span', { title: "Suiton" }, React.createElement(WaterIcon, { className: "w-full h-full text-blue-400" }));
      case '🌍': return React.createElement('span', { title: "Doton" }, React.createElement(EarthIcon, { className: "w-full h-full text-yellow-600" }));
      case '⚡️': return React.createElement('span', { title: "Raiton" }, React.createElement(LightningIcon, { className: "w-full h-full text-yellow-300" }));
      case '💨': return React.createElement('span', { title: "Fuuton" }, React.createElement(WindIcon, { className: "w-full h-full text-green-300" }));
      case '👁️': return React.createElement('span', { title: "Dojutsu" }, React.createElement(SpecialIcon, { className: "w-full h-full text-red-400" }));
      case '🐸':
      case '🐌':
      case '🐍':
      case '🐶':
      case '🐦':
      case '🐙':
           return React.createElement('span', { title: "Kuchiyose" }, React.createElement(SpecialIcon, { className: "w-full h-full text-green-400" }));
      default: return React.createElement('span', { title: "Jutsu" }, React.createElement(SpecialIcon, { className: "w-full h-full text-purple-400" }));
    }
};

const FavoriteButton = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return React.createElement(
    'button',
    {
      onClick: (e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item, category); },
      className: `p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`,
      "aria-label": "إضافة للمفضلة"
    },
    React.createElement(
      'svg',
      { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 transition-all duration-200 ${favorite ? 'text-yellow-400 fill-current scale-110' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
      React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  );
};

const ComparisonButton = ({ onClick }) => {
    return React.createElement(
        'button',
        {
            onClick: (e) => { e.preventDefault(); e.stopPropagation(); onClick(); },
            className: 'w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm bg-purple-600/50 hover:bg-purple-500/80',
            "aria-label": "بدء المقارنة",
            title: "بدء المقارنة"
        },
        React.createElement('span', { className: "font-black text-sm text-white" }, "VS")
    );
}

const CharacterCard = ({ character, onCompare, isPro }) => {
  const { openDetailView } = useShinobiPro();
  return React.createElement(
    'div',
    {
      onClick: () => openDetailView(character, 'characters'),
      className: "cursor-pointer relative group overflow-hidden rounded-xl themed-card transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 h-72 p-4"
    },
    React.createElement('div', { className: "absolute -inset-2 bg-gradient-to-br from-red-500 via-purple-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg" }),
    React.createElement(
      'div',
      { className: "relative z-10 w-full h-full flex flex-col justify-end" },
      React.createElement(
        'div',
        { className: "absolute top-0 right-0 z-20 flex flex-col gap-2" },
        isPro && React.createElement(ComparisonButton, { onClick: onCompare }),
        React.createElement(FavoriteButton, { item: character, category: "characters" })
      ),
      React.createElement(
        'div',
        { className: "w-full h-full flex flex-col justify-between" },
        React.createElement(
          'div',
          { className: "flex-grow flex items-center justify-center -mt-4" },
          React.createElement('span', { className: "text-9xl", role: "img", "aria-label": character.name }, character.emoji)
        ),
        React.createElement(
          'div',
          { className: "text-center bg-black/40 backdrop-blur-sm p-3 rounded-lg" },
          React.createElement('h3', { className: "text-xl font-bold font-cairo truncate" }, character.name),
          React.createElement(
            'div',
            { className: "flex items-center justify-center gap-2 mt-1" },
            React.createElement('span', { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-red-900/40 text-red-300" }, character.village),
            React.createElement('span', { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-300" }, character.rank)
          )
        )
      )
    )
  );
};

const CharactersPage = () => {
  const { isPro } = useShinobiPro();
  const navigate = ReactRouterDOM.useNavigate();

  const handleStartComparison = (character) => {
    navigate('/battle', { state: { challengerId: character.id } });
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h1', { className: "font-cairo text-4xl font-black text-center mb-2" }, "شخصيات عالم ناروتو"),
    React.createElement('p', { className: "text-center text-gray-400 mb-8" }, "اكتشف أبطال وأشرار عالم الشينوبي."),
    React.createElement(
      'div',
      { className: "mb-8" },
      React.createElement(GlobalSearchBar)
    ),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" },
      characters.map(character => React.createElement(CharacterCard, {
        key: character.id,
        character: character,
        onCompare: () => handleStartComparison(character),
        isPro: isPro
      }))
    )
  );
};

export default CharactersPage;
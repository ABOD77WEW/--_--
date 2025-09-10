
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs.js';
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
      className: `z-10 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`,
      "aria-label": "إضافة للمفضلة"
    },
    React.createElement(
      'svg',
      { xmlns: "http://www.w3.org/2000/svg", className: `h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
      React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  );
};

const ArcCard = ({ arc, onSelect }) => {
  return React.createElement(
    'div',
    {
      onClick: onSelect,
      className: "relative group overflow-hidden rounded-lg themed-card shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 flex flex-col text-center p-4 cursor-pointer"
    },
    React.createElement(FavoriteButton, { item: arc, category: "arcs", className: "absolute top-3 right-3" }),
    React.createElement(
      'div',
      { className: "flex-grow flex items-center justify-center py-6" },
      React.createElement('span', { className: "text-8xl transition-transform duration-300 group-hover:scale-125", role: "img", "aria-label": arc.name }, arc.emoji)
    ),
    React.createElement(
      'div',
      { className: "mt-auto" },
      React.createElement('h3', { className: "text-lg font-bold font-cairo truncate" }, arc.name),
      React.createElement('p', { className: "text-sm text-gray-400 font-mono tracking-wider" }, arc.episodeRange)
    )
  );
};

const ArcDetails = ({ arc }) => {
    return React.createElement(
        'div',
        { className: "w-full text-center p-4" },
        React.createElement(
            'div',
            { className: "mx-auto w-40 h-40 flex items-center justify-center rounded-lg bg-gray-700/50 mb-6 border-4 border-gray-600" },
            React.createElement('span', { className: "text-9xl" }, arc.emoji)
        ),
        React.createElement('h2', { className: "font-cairo text-4xl font-bold mb-2" }, arc.name),
        React.createElement('p', { className: "font-mono text-lg text-gray-400 mb-6" }, arc.episodeRange),
        React.createElement('p', { className: "text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto" }, arc.summary)
    );
};

const ArcsPage = () => {
    const [selectedArc, setSelectedArc] = useState(null);
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
      const selectedId = location.state?.selectedId;
      if (typeof selectedId === 'number') {
        const arc = arcs.find(a => a.id === selectedId);
        if (arc) {
          setSelectedArc(arc);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }, [location.state, navigate]);
    
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
      arcs.map(arc => React.createElement(ArcCard, { key: arc.id, arc: arc, onSelect: () => setSelectedArc(arc) }))
    ),
    React.createElement(
      FullScreenDetailView,
      { show: !!selectedArc, onClose: () => setSelectedArc(null) },
      selectedArc && React.createElement(ArcDetails, { arc: selectedArc })
    )
  );
};

export default ArcsPage;

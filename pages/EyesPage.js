import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { eyes } from '../data/eyes.js';
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
      className: `z-10 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 ${className}`,
      "aria-label": "إضافة للمفضلة"
    },
    React.createElement(
      'svg',
      { xmlns: "http://www.w3.org/2000/svg", className: `h-6 w-6 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`, viewBox: "0 0 20 20", fill: "currentColor" },
      React.createElement('path', { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
    )
  );
};

const EyeCard = ({ eye, onSelect }) => {
  const SvgIcon = eye.svg;
  return React.createElement(
    'div',
    {
      onClick: onSelect,
      className: "relative group p-6 rounded-lg themed-card shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 cursor-pointer"
    },
    React.createElement(FavoriteButton, { item: eye, category: "eyes", className: "absolute top-4 right-4" }),
    React.createElement(
      'div',
      { className: "w-32 h-32 mb-4" },
      React.createElement(SvgIcon, {
        className: "w-full h-full transition-all duration-500 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110",
        style: { filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }
      })
    ),
    React.createElement('h3', { className: "text-2xl font-bold font-cairo mb-2" }, eye.name),
    React.createElement('p', { className: "text-gray-400" }, eye.description)
  );
};

const EyeDetails = ({ eye }) => {
    const SvgIcon = eye.svg;
    return React.createElement(
        'div',
        { className: "w-full text-center p-4" },
        React.createElement(FavoriteButton, { item: eye, category: "eyes", className: "absolute top-6 left-6 !p-3" }),
        React.createElement(
            'div',
            { className: "mx-auto w-48 h-48 mb-6" },
            React.createElement(SvgIcon, { className: "w-full h-full", style: { filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))' } })
        ),
        React.createElement('h2', { className: "font-cairo text-4xl font-bold mb-4" }, eye.name),
        React.createElement('p', { className: "text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto" }, eye.summary)
    );
};

const EyesPage = () => {
    const [selectedEye, setSelectedEye] = useState(null);
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
      const selectedId = location.state?.selectedId;
      if (typeof selectedId === 'number') {
        const eye = eyes.find(e => e.id === selectedId);
        if (eye) {
          setSelectedEye(eye);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }, [location.state, navigate]);

  return React.createElement(
    'div',
    null,
    React.createElement('h1', { className: "font-cairo text-4xl font-black text-center mb-2" }, "عيون الشينوبي (الدوجتسو)"),
    React.createElement('p', { className: "text-center text-gray-400 mb-8" }, "اكتشف أسرار أقوى التقنيات البصرية."),
    React.createElement(
      'div',
      { className: "max-w-xl mx-auto mb-8" },
      React.createElement(GlobalSearchBar)
    ),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
      eyes.map(eye => React.createElement(EyeCard, { key: eye.id, eye: eye, onSelect: () => setSelectedEye(eye) }))
    ),
    React.createElement(
      FullScreenDetailView,
      { show: !!selectedEye, onClose: () => setSelectedEye(null) },
      selectedEye && React.createElement(EyeDetails, { eye: selectedEye })
    )
  );
};

export default EyesPage;

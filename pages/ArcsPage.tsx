


import React, { useState, useMemo, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs';
import { useFavorites } from '../hooks/useFavorites';
import { Arc, FavoriteCategory } from '../types';
import GlobalSearchBar from '../components/GlobalSearchBar';
import FullScreenDetailView from '../components/FullScreenDetailView';

const FavoriteButton: React.FC<{ item: Arc; category: FavoriteCategory; className?: string }> = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item, category); }} className={`z-10 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`} aria-label="إضافة للمفضلة">
       <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const ArcCard: React.FC<{ arc: Arc; onSelect: () => void }> = ({ arc, onSelect }) => {
  return (
    <div onClick={onSelect} className="relative group overflow-hidden rounded-lg themed-card shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1 flex flex-col text-center p-4 cursor-pointer">
        <FavoriteButton item={arc} category="arcs" className="absolute top-3 right-3" />
        <div className="flex-grow flex items-center justify-center py-6">
            <span className="text-8xl transition-transform duration-300 group-hover:scale-125" role="img" aria-label={arc.name}>{arc.emoji}</span>
        </div>
        <div className="mt-auto">
            <h3 className="text-lg font-bold font-cairo truncate">{arc.name}</h3>
            <p className="text-sm text-gray-400 font-mono tracking-wider">{arc.episodeRange}</p>
        </div>
    </div>
  );
};

const ArcDetails: React.FC<{ arc: Arc }> = ({ arc }) => {
    return (
        <div className="w-full text-center p-4">
            <FavoriteButton item={arc} category="arcs" className="absolute top-6 left-6 !p-3" />
            <div className="mx-auto w-40 h-40 flex items-center justify-center rounded-lg bg-gray-700/50 mb-6 border-4 border-gray-600">
                <span className="text-9xl">{arc.emoji}</span>
            </div>
            <h2 className="font-cairo text-4xl font-bold mb-2">{arc.name}</h2>
            <p className="font-mono text-lg text-gray-400 mb-6">{arc.episodeRange}</p>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                {arc.summary}
            </p>
        </div>
    );
};

const ArcsPage: React.FC = () => {
    const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
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
    
  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">آركات قصة ناروتو</h1>
      <p className="text-center text-gray-400 mb-8">تتبع رحلة ناروتو وأصدقائه عبر الأحداث والمغامرات.</p>
      <div className="max-w-xl mx-auto mb-8">
        <GlobalSearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {arcs.map(arc => (
          <ArcCard key={arc.id} arc={arc} onSelect={() => setSelectedArc(arc)} />
        ))}
      </div>
      <FullScreenDetailView show={!!selectedArc} onClose={() => setSelectedArc(null)}>
        {selectedArc && <ArcDetails arc={selectedArc} />}
      </FullScreenDetailView>
    </div>
  );
};

export default ArcsPage;
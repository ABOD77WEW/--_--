import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { arcs } from '../data/arcs';
import { useFavorites } from '../hooks/useFavorites';
import { Arc, FavoriteCategory } from '../types';
import GlobalSearchBar from '../components/GlobalSearchBar';
import { useShinobiPro } from '../hooks/useShinobiPro';

const FavoriteButton: React.FC<{ item: Arc; category: FavoriteCategory; className?: string }> = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item, category); }} className={`z-20 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`} aria-label="إضافة للمفضلة">
       <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const ArcCard: React.FC<{ arc: Arc; }> = ({ arc }) => {
  const { openDetailView } = useShinobiPro();
  return (
    <div 
      onClick={() => openDetailView(arc, 'arcs')}
      className="cursor-pointer relative group overflow-hidden rounded-lg themed-card shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/50 flex flex-col text-center p-4">
        <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"></div>
        <div className="relative z-10 w-full h-full flex flex-col">
          <FavoriteButton item={arc} category="arcs" className="absolute top-0 right-0" />
          <div className="w-full h-full flex flex-col">
            <div className="flex-grow flex items-center justify-center py-6">
                <span className="text-8xl" role="img" aria-label={arc.name}>{arc.emoji}</span>
            </div>
            <div className="mt-auto">
                <h3 className="text-lg font-bold font-cairo truncate">{arc.name}</h3>
                <p className="text-sm text-gray-400 font-mono tracking-wider">{arc.episodeRange}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

const ArcsPage: React.FC = () => {
  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">آركات قصة ناروتو</h1>
      <p className="text-center text-gray-400 mb-8">تتبع رحلة ناروتو وأصدقائه عبر الأحداث والمغامرات.</p>
      <div className="max-w-xl mx-auto mb-8">
        <GlobalSearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {arcs.map(arc => (
          <ArcCard key={arc.id} arc={arc} />
        ))}
      </div>
    </div>
  );
};

export default ArcsPage;
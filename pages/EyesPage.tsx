import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { eyes } from '../data/eyes.ts';
import { useFavorites } from '../hooks/useFavorites.ts';
import GlobalSearchBar from '../components/GlobalSearchBar.tsx';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';

const FavoriteButton = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item, category); }} className={`z-20 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 ${className}`} aria-label="إضافة للمفضلة">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const EyeCard = ({ eye }) => {
  const { openDetailView } = useShinobiPro();
  const SvgIcon = eye.svg;
  return (
    <div 
      onClick={() => openDetailView(eye, 'eyes')}
      className="cursor-pointer relative group p-6 rounded-lg themed-card shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50">
      <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"></div>
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        <FavoriteButton item={eye} category="eyes" className="absolute top-0 right-0" />
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-32 h-32 mb-4">
              <SvgIcon className="w-full h-full" style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }} />
            </div>
            <h3 className="text-2xl font-bold font-cairo mb-2">{eye.name}</h3>
            <p className="text-gray-400">{eye.description}</p>
        </div>
      </div>
    </div>
  );
};

const EyesPage = () => {
  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">عيون الشينوبي (الدوجتسو)</h1>
      <p className="text-center text-gray-400 mb-8">اكتشف أسرار أقوى التقنيات البصرية.</p>
       <div className="max-w-xl mx-auto mb-8">
        <GlobalSearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eyes.map(eye => (
          <EyeCard key={eye.id} eye={eye} />
        ))}
      </div>
    </div>
  );
};

export default EyesPage;
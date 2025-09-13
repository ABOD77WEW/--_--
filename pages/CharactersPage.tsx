import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.ts';
import { useFavorites } from '../hooks/useFavorites.ts';
import GlobalSearchBar from '../components/GlobalSearchBar.tsx';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';

// FIX: Made className prop optional with a default value to fix missing prop error.
const FavoriteButton = ({ item, category, className = '' }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item, category); }} 
      className={`p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`} 
      aria-label="إضافة للمفضلة"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-all duration-200 ${favorite ? 'text-yellow-400 fill-current scale-110' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const ComparisonButton = ({ onClick }) => {
    return (
        <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm bg-purple-600/50 hover:bg-purple-500/80`}
            aria-label="بدء المقارنة"
            title="بدء المقارنة"
        >
            <span className="font-black text-sm text-white">VS</span>
        </button>
    );
}

const CharacterCard = ({ character, onCompare, isPro }) => {
  const { openDetailView } = useShinobiPro();

  return (
    <div 
      onClick={() => openDetailView(character, 'characters')}
      className="cursor-pointer relative group overflow-hidden rounded-xl themed-card transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 h-72 p-4"
    >
      <div className="absolute -inset-2 bg-gradient-to-br from-red-500 via-purple-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        <div className="absolute top-0 right-0 z-20 flex flex-col gap-2">
            {isPro && <ComparisonButton onClick={onCompare} />}
            <FavoriteButton item={character} category="characters" />
        </div>
        
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex-grow flex items-center justify-center -mt-4">
            <span className="text-9xl" role="img" aria-label={character.name}>
              {character.emoji}
            </span>
          </div>
          
          <div className="text-center bg-black/40 backdrop-blur-sm p-3 rounded-lg">
            <h3 className="text-xl font-bold font-cairo truncate">{character.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-900/40 text-red-300">
                {character.village}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-500/20 text-gray-300">
                {character.rank}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharactersPage = () => {
  const { isPro } = useShinobiPro();
  const navigate = ReactRouterDOM.useNavigate();

  const handleStartComparison = (character) => {
    navigate('/battle', { state: { challengerId: character.id } });
  };

  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">شخصيات عالم ناروتو</h1>
      <p className="text-center text-gray-400 mb-8">اكتشف أبطال وأشرار عالم الشينوبي.</p>
      
      <div className="mb-8">
        <GlobalSearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map(character => (
          <CharacterCard 
            key={character.id} 
            character={character} 
            onCompare={() => handleStartComparison(character)}
            isPro={isPro}
          />
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
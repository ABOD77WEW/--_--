


import React, { useState, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters';
import { Character, FavoriteCategory } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import GlobalSearchBar from '../components/GlobalSearchBar';
import FullScreenDetailView from '../components/FullScreenDetailView';
import { useShinobiPro } from '../hooks/useShinobiPro';

const FavoriteButton: React.FC<{ item: Character; category: FavoriteCategory; className?: string }> = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button 
      onClick={(e) => { e.stopPropagation(); toggleFavorite(item, category); }} 
      className={`p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 backdrop-blur-sm ${className}`} 
      aria-label="إضافة للمفضلة"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-all duration-200 ${favorite ? 'text-yellow-400 fill-current scale-110' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const ComparisonButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button 
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm bg-purple-600/50 hover:bg-purple-500/80`}
            aria-label="بدء المقارنة"
            title="بدء المقارنة"
        >
            <span className="font-black text-sm text-white">VS</span>
        </button>
    );
}

const CharacterCard: React.FC<{ character: Character; onSelect: () => void; onCompare: () => void; isPro: boolean; }> = ({ character, onSelect, onCompare, isPro }) => {
  return (
    <div 
      onClick={onSelect} 
      className="relative group overflow-hidden rounded-xl themed-card transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:-translate-y-2 flex flex-col justify-end p-4 h-72 cursor-pointer"
    >
      <div className="absolute -inset-2 bg-gradient-to-br from-red-500 via-purple-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-lg"></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            {isPro && <ComparisonButton onClick={onCompare} />}
            <FavoriteButton item={character} category="characters" />
        </div>
        
        <div className="flex-grow flex items-center justify-center -mt-4">
          <span className="text-9xl transition-transform duration-300 group-hover:scale-125" role="img" aria-label={character.name}>
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
  );
};

const CharacterDetails: React.FC<{ character: Character }> = ({ character }) => {
    return (
        <div className="w-full text-right p-4" dir="rtl">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0 lg:w-1/3 text-center">
                    <div className="mx-auto w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/50 mb-6 border-4 border-gray-600 shadow-lg">
                        <span className="text-9xl">{character.emoji}</span>
                    </div>
                    <h2 className="font-cairo text-4xl md:text-5xl font-bold mb-2">{character.name}</h2>
                    <p className="text-lg text-red-400 font-semibold mb-6">{character.village} - {character.rank}</p>
                    
                    <div className="space-y-2 text-right bg-black/20 p-4 rounded-lg">
                        <p><strong className="font-semibold text-gray-300 ml-2">العمر:</strong> {character.age}</p>
                        <p><strong className="font-semibold text-gray-300 ml-2">الأب:</strong> {character.fatherName}</p>
                        <p><strong className="font-semibold text-gray-300 ml-2">الفريق:</strong> {character.team.join('، ')}</p>
                    </div>
                </div>

                <div className="flex-grow">
                    <blockquote className="border-r-4 border-gray-600 pr-4 my-6">
                        <p className="text-lg italic text-gray-300">"{character.quote}"</p>
                    </blockquote>

                    <div className="my-6">
                        <h4 className="font-bold text-xl mb-3 border-b-2 border-gray-700 pb-1">القدرات الأساسية:</h4>
                        <div className="flex justify-start flex-wrap gap-3">
                            {character.abilities.map((ability, index) => (
                                <span key={index} className="px-3 py-1 bg-purple-900/50 text-purple-300 text-sm font-semibold rounded-full">{ability}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="my-6">
                        <h4 className="font-bold text-xl mb-3 border-b-2 border-gray-700 pb-1">أبرز التقنيات:</h4>
                        <div className="flex justify-start flex-wrap gap-4">
                            {character.techniques.map((tech, index) => (
                                <div key={index} className="w-16 h-16 flex items-center justify-center text-3xl bg-black/20 rounded-lg shadow-sm" title={tech}>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="my-6">
                        <h4 className="font-bold text-xl mb-3 border-b-2 border-gray-700 pb-1">مستوى القوة:</h4>
                        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-4 rounded-full" style={{ width: `${character.powerLevel * 10}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const CharactersPage: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { isPro } = useShinobiPro();
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();

  useEffect(() => {
    const selectedId = location.state?.selectedId;
    if (typeof selectedId === 'number') {
      const character = characters.find(c => c.id === selectedId);
      if (character) {
        setSelectedCharacter(character);
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, navigate]);

  const handleStartComparison = (character: Character) => {
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
            onSelect={() => setSelectedCharacter(character)}
            onCompare={() => handleStartComparison(character)}
            isPro={isPro}
          />
        ))}
      </div>

      <FullScreenDetailView show={!!selectedCharacter} onClose={() => setSelectedCharacter(null)}>
        {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
      </FullScreenDetailView>
      
    </div>
  );
};

export default CharactersPage;
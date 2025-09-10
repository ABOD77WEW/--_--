


import React, { useState, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { clans } from '../data/clans';
import { Clan, FavoriteCategory } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import GlobalSearchBar from '../components/GlobalSearchBar';
import FullScreenDetailView from '../components/FullScreenDetailView';

const FavoriteButton: React.FC<{ item: Clan; category: FavoriteCategory; className?: string }> = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);
  
  return (
    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item, category); }} className={`z-20 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 ${className}`} aria-label="إضافة للمفضلة">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const ClanCard: React.FC<{ clan: Clan; onSelect: () => void }> = ({ clan, onSelect }) => {
  const Symbol = clan.symbol;
  return (
    <div onClick={onSelect} className="relative group p-6 rounded-lg themed-card shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 cursor-pointer">
        <FavoriteButton item={clan} category="clans" className="absolute top-4 right-4" />
        <div className="w-24 h-24 mb-4 flex-shrink-0">
            <Symbol className="w-full h-full text-gray-300 transition-colors duration-300 group-hover:text-red-500" />
        </div>
        <div className="flex-grow">
            <h3 className="text-2xl font-bold font-cairo mb-2">{clan.name}</h3>
            <p className="text-sm text-gray-400 font-tajawal line-clamp-3">
                {clan.history}
            </p>
        </div>
    </div>
  );
};


const ClanDetails: React.FC<{ clan: Clan; }> = ({ clan }) => {
  const Symbol = clan.symbol;
  return (
    <div className="w-full text-right p-4">
        <FavoriteButton item={clan} category="clans" className="absolute top-6 left-6 !p-3" />
        <div className="flex flex-col md:flex-row items-center md:items-start md:text-right gap-6 mb-6">
            <div className="w-32 h-32 flex-shrink-0 bg-gray-900/50 rounded-lg p-4 border-2 border-gray-700">
                 <Symbol className="w-full h-full text-red-400" style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
            </div>
            <div className="flex-grow text-center md:text-right">
                <h2 className="font-cairo text-4xl font-bold mb-2">{clan.name}</h2>
                 <p className="text-gray-400">{clan.history}</p>
            </div>
        </div>
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-xl mb-2 border-b-2 border-gray-700 pb-1">ملخص:</h4>
                <p className="text-gray-300">{clan.summary}</p>
            </div>
            <div>
                <h4 className="font-bold text-xl mb-2 border-b-2 border-gray-700 pb-1">أبرز الأعضاء:</h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {clan.members.map(member => (
                        <span key={member} className="px-3 py-1 bg-red-900/50 text-red-300 text-sm font-semibold rounded-full">{member}</span>
                    ))}
                </div>
            </div>
        </div>
      </div>
  );
};


const ClansPage: React.FC = () => {
    const [selectedClan, setSelectedClan] = useState<Clan | null>(null);
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
      const selectedId = (location.state as { selectedId?: number })?.selectedId;
      if (typeof selectedId === 'number') {
        const clan = clans.find(c => c.id === selectedId);
        if (clan) {
          setSelectedClan(clan);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }, [location.state, navigate]);

  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">العشائر والمنظمات</h1>
      <p className="text-center text-gray-400 mb-8">استكشف القوى والتجمعات التي شكلت عالم النينجا.</p>
      <div className="max-w-xl mx-auto mb-8">
        <GlobalSearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clans.map(clan => (
          <ClanCard key={clan.id} clan={clan} onSelect={() => setSelectedClan(clan)} />
        ))}
      </div>
      <FullScreenDetailView show={!!selectedClan} onClose={() => setSelectedClan(null)}>
        {selectedClan && <ClanDetails clan={selectedClan} />}
      </FullScreenDetailView>
    </div>
  );
};

export default ClansPage;
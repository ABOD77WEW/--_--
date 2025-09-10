



import React, { useState, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { eyes } from '../data/eyes';
import { useFavorites } from '../hooks/useFavorites';
import { Eye, FavoriteCategory } from '../types';
import GlobalSearchBar from '../components/GlobalSearchBar';
import FullScreenDetailView from '../components/FullScreenDetailView';

const FavoriteButton: React.FC<{ item: Eye; category: FavoriteCategory; className?: string }> = ({ item, category, className }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(item.id, category);

  return (
    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item, category); }} className={`z-10 p-2 rounded-full bg-black/30 hover:bg-yellow-500/50 transition-colors duration-300 ${className}`} aria-label="إضافة للمفضلة">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${favorite ? 'text-yellow-400 fill-current' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );
};

const EyeCard: React.FC<{ eye: Eye; onSelect: () => void }> = ({ eye, onSelect }) => {
  const SvgIcon = eye.svg;
  return (
    <div onClick={onSelect} className="relative group p-6 rounded-lg themed-card shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1 cursor-pointer">
      <FavoriteButton item={eye} category="eyes" className="absolute top-4 right-4" />
      <div className="w-32 h-32 mb-4">
        <SvgIcon className="w-full h-full transition-all duration-500 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110" style={{ filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))' }} />
      </div>
      <h3 className="text-2xl font-bold font-cairo mb-2">{eye.name}</h3>
      <p className="text-gray-400">{eye.description}</p>
    </div>
  );
};

const EyeDetails: React.FC<{ eye: Eye }> = ({ eye }) => {
    const SvgIcon = eye.svg;
    return (
        <div className="w-full text-center p-4">
             <div className="mx-auto w-48 h-48 mb-6">
                <SvgIcon className="w-full h-full" style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))' }} />
            </div>
            <h2 className="font-cairo text-4xl font-bold mb-4">{eye.name}</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                {eye.summary}
            </p>
        </div>
    );
};

const EyesPage: React.FC = () => {
    const [selectedEye, setSelectedEye] = useState<Eye | null>(null);
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    useEffect(() => {
      const selectedId = (location.state as { selectedId?: number })?.selectedId;
      if (typeof selectedId === 'number') {
        const eye = eyes.find(e => e.id === selectedId);
        if (eye) {
          setSelectedEye(eye);
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    }, [location.state, navigate]);

  return (
    <div>
      <h1 className="font-cairo text-4xl font-black text-center mb-2">عيون الشينوبي (الدوجتسو)</h1>
      <p className="text-center text-gray-400 mb-8">اكتشف أسرار أقوى التقنيات البصرية.</p>
       <div className="max-w-xl mx-auto mb-8">
        <GlobalSearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {eyes.map(eye => (
          <EyeCard key={eye.id} eye={eye} onSelect={() => setSelectedEye(eye)} />
        ))}
      </div>
       <FullScreenDetailView show={!!selectedEye} onClose={() => setSelectedEye(null)}>
            {selectedEye && <EyeDetails eye={selectedEye} />}
       </FullScreenDetailView>
    </div>
  );
};

export default EyesPage;
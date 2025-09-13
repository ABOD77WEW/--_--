import React, { useEffect } from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro';
import { Character, Arc, Eye, Clan } from '../types';

const DetailViewExitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="detail-exit-button"
        aria-label="إغلاق"
        title="إغلاق"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);

const CharacterDetail: React.FC<{ item: Character }> = ({ item }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right">
        <div className="flex flex-col items-center md:col-span-1">
            <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/10 mb-6 border-4 border-red-900/50 shadow-lg">
                <span className="text-9xl" style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}>{item.emoji}</span>
            </div>
        </div>
        <div className="md:col-span-2">
            <h1 className="text-5xl font-cairo font-black text-[#6b4f4f]">{item.name}</h1>
            <div className="flex items-center justify-center md:justify-end gap-2 my-3">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-900/20 text-red-900">{item.village}</span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-500/20 text-gray-800">{item.rank}</span>
            </div>
            <div className="scroll-ink-divider"></div>
            <blockquote className="text-lg italic text-gray-800/80 border-r-4 border-red-900/50 pr-4 my-6">
                "{item.quote}"
            </blockquote>
            <div className="mb-4">
                <h3 className="font-cairo font-bold text-xl mb-2">مستوى القوة</h3>
                <div className="w-full bg-black/10 rounded-full h-6">
                    <div 
                        className="bg-gradient-to-r from-purple-800 to-red-700 h-6 rounded-full text-center text-white font-bold flex items-center justify-center"
                        style={{width: `${item.powerLevel * 10}%`}}
                    >
                        {item.powerLevel}/10
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <h3 className="font-cairo font-bold text-xl mb-2">القدرات</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-800/90">
                        {item.abilities.map(ability => <li key={ability}>{ability}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-cairo font-bold text-xl mb-2">الفريق</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-800/90">
                        {item.team.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

const ArcDetail: React.FC<{ item: Arc }> = ({ item }) => (
    <div className="text-center">
        <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/10 mb-6 border-4 border-blue-900/50 shadow-lg mx-auto">
           <span className="text-9xl">{item.emoji}</span>
        </div>
        <h1 className="text-5xl font-cairo font-black text-[#4a2e2e]">{item.name}</h1>
        <p className="font-mono text-lg text-gray-800/70 my-2">{item.episodeRange}</p>
        <div className="scroll-ink-divider"></div>
        <p className="text-lg text-gray-800/90 leading-relaxed text-right">
            {item.summary}
        </p>
    </div>
);

const EyeDetail: React.FC<{ item: Eye }> = ({ item }) => {
    const SvgIcon = item.svg;
    return (
        <div className="text-center">
            <div className="w-48 h-48 mb-6 mx-auto">
               <SvgIcon className="w-full h-full text-red-800" style={{ filter: 'drop-shadow(0 0 15px rgba(185, 28, 28, 0.4))' }} />
            </div>
            <h1 className="text-5xl font-cairo font-black text-[#4a2e2e]">{item.name}</h1>
            <p className="text-lg text-gray-800/70 my-2">{item.description}</p>
            <div className="scroll-ink-divider"></div>
            <p className="text-lg text-gray-800/90 leading-relaxed text-right">
                {item.summary}
            </p>
        </div>
    );
};

const ClanDetail: React.FC<{ item: Clan }> = ({ item }) => {
    const Symbol = item.symbol;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right">
            <div className="flex flex-col items-center md:col-span-1">
                <div className="w-48 h-48 p-4 flex items-center justify-center mb-6">
                   <Symbol className="w-full h-full text-gray-800/80" />
                </div>
            </div>
            <div className="md:col-span-2">
                <h1 className="text-5xl font-cairo font-black text-[#4a2e2e]">{item.name}</h1>
                 <div className="scroll-ink-divider my-4"></div>
                <p className="text-lg text-gray-800/90 mb-6">
                    {item.summary}
                </p>
                <div>
                    <h3 className="font-cairo font-bold text-xl mb-2 border-r-4 border-gray-900/20 pr-3">أبرز الأعضاء</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {item.members.map(member => (
                            <span key={member} className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-500/20 text-gray-800">{member}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const FullScreenDetailView: React.FC = () => {
    const { isDetailViewOpen, detailViewContent, closeDetailView } = useShinobiPro();
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeDetailView();
            }
        };

        if (isDetailViewOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDetailViewOpen, closeDetailView]);
    
    if (!isDetailViewOpen || !detailViewContent.item) {
        return null;
    }

    const { item, category } = detailViewContent;
    
    const renderContent = () => {
        switch (category) {
            case 'characters': return <CharacterDetail item={item as Character} />;
            case 'arcs': return <ArcDetail item={item as Arc} />;
            case 'eyes': return <EyeDetail item={item as Eye} />;
            case 'clans': return <ClanDetail item={item as Clan} />;
            default: return <div>تفاصيل غير معروفة</div>;
        }
    }

    return (
        <div className="scroll-view-container" onClick={closeDetailView}>
            <div className="scroll-view-content" onClick={(e) => e.stopPropagation()}>
                <DetailViewExitButton onClick={closeDetailView} />
                 <div className="scroll-view-content-inner">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FullScreenDetailView;
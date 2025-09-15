import React, { useState, useEffect, useMemo } from 'react';
// FIX: Changed import to use require for react-router-dom to fix module resolution issues.
// FIX: Switched from require to a standard ES module import for react-router-dom to fix module resolution error.
import { useLocation, useNavigate } from 'react-router-dom';
import { characters } from '../data/characters.ts';

// Main Component
const BattlePage = () => {
    // FIX: Updated hook calls to use the ReactRouterDOM namespace.
    const location = useLocation();
    const navigate = useNavigate();

    const [challenger, setChallenger] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [phase, setPhase] = useState('select'); // 'select', 'intro', 'result'
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const challengerId = location.state?.challengerId;
        if (!challengerId) {
            navigate('/characters');
            return;
        }
        const foundChallenger = characters.find(c => c.id === challengerId);
        setChallenger(foundChallenger || null);
        if (!foundChallenger) {
             navigate('/characters');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (phase === 'intro') {
            const timer = setTimeout(() => {
                setPhase('result');
            }, 4000); // Duration of the clash animation
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleSelectOpponent = (selectedOpponent) => {
        setOpponent(selectedOpponent);
        setPhase('intro');
    };
    
    const handleReset = () => {
        // Keep the challenger, just reset the opponent and phase
        const currentChallengerId = challenger?.id;
        setOpponent(null);
        setSearchTerm('');
        setPhase('select');
        // Use navigate to reset the state but keep the challenger
        navigate('/battle', { state: { challengerId: currentChallengerId }, replace: true });
    };

    const availableOpponents = useMemo(() =>
        characters.filter(c => c.id !== challenger?.id && c.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [challenger, searchTerm]
    );

    if (!challenger) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]"><p className="text-xl">جاري استدعاء المتحدي...</p></div>;
    }

    return (
        <div className="battle-page-container">
            {phase === 'select' && (
                <SelectionPhase
                    challenger={challenger}
                    opponents={availableOpponents}
                    searchTerm={searchTerm}
                    onSearchTermChange={setSearchTerm}
                    onSelectOpponent={handleSelectOpponent}
                />
            )}
            {phase === 'intro' && challenger && opponent && (
                <IntroPhase challenger={challenger} opponent={opponent} />
            )}
            {phase === 'result' && challenger && opponent && (
                <ResultPhase
                    challenger={challenger}
                    opponent={opponent}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

// Sub-components for each phase
const SelectionPhase = ({ challenger, opponents, searchTerm, onSearchTermChange, onSelectOpponent }) => (
    <div className="battle-selection-grid">
        <div className="challenger-pod">
            <h2 className="pod-title">المتحدي</h2>
            <div className="pod-emoji-container border-red-500">
                <span className="text-9xl">{challenger.emoji}</span>
            </div>
            <h3 className="pod-name">{challenger.name}</h3>
            <p className="pod-rank">{challenger.rank}</p>
        </div>
        <div className="opponent-scroll-container">
            <h2 className="scroll-title">لفافة الشينوبي: اختر خصمك</h2>
            <input
                type="text"
                placeholder="ابحث عن مقاتل..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="scroll-search-input"
            />
            <div className="scroll-list">
                {opponents.length > 0 ? opponents.map(opp => (
                    <button key={opp.id} onClick={() => onSelectOpponent(opp)} className="scroll-opponent-card">
                        <span className="text-5xl">{opp.emoji}</span>
                        <span className="scroll-opponent-name">{opp.name}</span>
                    </button>
                )) : <p className="text-center text-[#9a8e7a] p-4">لم يتم العثور على شينوبي.</p>}
            </div>
        </div>
    </div>
);

const IntroPhase = ({ challenger, opponent }) => (
    <div className="battle-intro-container">
        <div className="fighter-intro-pod left">
            <div className="chakra-burst kyubi-burst"></div>
            <span className="text-9xl">{challenger.emoji}</span>
        </div>
        <div className="fighter-intro-pod right">
            <div className="chakra-burst susanoo-burst"></div>
            <span className="text-9xl">{opponent.emoji}</span>
        </div>
        <div className="cosmic-clash-center">
            <div className="cosmic-clash-explosion"></div>
            <div className="cosmic-clash-shockwave"></div>
        </div>
    </div>
);

const ResultPhase = ({ challenger, opponent, onReset }) => {
    const isDraw = challenger.powerLevel === opponent.powerLevel;
    const winner = isDraw ? null : (challenger.powerLevel > opponent.powerLevel ? challenger : opponent);

    return (
        <div className="battle-result-container">
            <div className="result-fighters-grid">
                <FighterResultPod character={challenger} isWinner={winner?.id === challenger.id} isLoser={!!winner && winner.id !== challenger.id} />
                <FighterResultPod character={opponent} isWinner={winner?.id === opponent.id} isLoser={!!winner && winner.id !== opponent.id} />
            </div>
             {isDraw && (
                <div className="draw-announcement">تعادل!</div>
            )}
            <div className="result-cards-grid">
                 <ResultCard character={challenger} opponent={opponent} />
                 <ResultCard character={opponent} opponent={challenger} />
            </div>
            <button onClick={onReset} className="new-battle-button">مواجهة جديدة</button>
        </div>
    );
};

// Helper components for phases
const FighterResultPod = ({ character, isWinner, isLoser }) => (
    <div className={`fighter-result-pod ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}>
        {isWinner && <div className="winner-announcement">الفائز</div>}
        <div className={`pod-emoji-container-result ${isWinner ? 'border-amber-400 winner-aura-strong' : 'border-gray-700'}`}>
            <span className="text-9xl">{character.emoji}</span>
        </div>
        <h3 className="pod-name-result">{character.name}</h3>
    </div>
);

const ResultCard = ({ character, opponent }) => {
    const isWinner = character.powerLevel > opponent.powerLevel;
    const powerLevelClass = isWinner ? 'text-amber-400 font-black' : 'text-white';
    
    return (
        <div className={`battle-result-card ${isWinner ? 'winner-card' : ''}`}>
            <h4 className="result-card-title">{character.name}</h4>
            <div className="result-card-stats">
                <div className="stat-row">
                    <span className="stat-label">مستوى القوة</span>
                    <span className={`stat-value ${powerLevelClass}`}>{character.powerLevel}</span>
                </div>
                <div className="stat-row">
                    <span className="stat-label">الرتبة</span>
                    <span className="stat-value">{character.rank}</span>
                </div>
                <div className="stat-row">
                    <span className="stat-label">القرية</span>
                    <span className="stat-value">{character.village}</span>
                </div>
                 <div className="stat-column">
                    <span className="stat-label-col">القدرات الرئيسية</span>
                    <ul className="stat-list">
                        {character.abilities.slice(0, 3).map(ability => <li key={ability}>{ability}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BattlePage;

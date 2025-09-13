

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { characters } from '../data/characters.ts';

// FIX: Added a default value to the 'winner' prop to make it optional at call sites.
const ComparisonStat = ({
    label,
    value1,
    value2,
    winner = 'draw',
}) => {
    const p1Class = winner === 'p1' ? 'text-amber-400 font-bold' : '';
    const p2Class = winner === 'p2' ? 'text-amber-400 font-bold' : '';
    
    return (
        <div className="grid grid-cols-3 items-center text-center gap-2 md:gap-4 py-2 border-b border-gray-700 last:border-b-0">
            <div className={`text-sm md:text-lg ${p1Class}`}>{value1}</div>
            <div className="text-xs md:text-sm font-semibold text-gray-400">{label}</div>
            <div className={`text-sm md:text-lg ${p2Class}`}>{value2}</div>
        </div>
    );
};

const ComparisonView = ({ challenger, opponent }) => {
    const powerWinner = challenger.powerLevel > opponent.powerLevel ? 'p1' : opponent.powerLevel > challenger.powerLevel ? 'p2' : 'draw';
    
    return (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto animate-[results-fade-in_1s_0.5s_ease-out_backwards]">
             <div className="themed-card p-4 md:p-6 rounded-2xl">
                <h2 className="text-xl md:text-2xl font-cairo font-bold text-center mb-4 border-b-2 border-gray-700 pb-2">
                    مقارنة شاملة
                </h2>
                <div className="space-y-1">
                    <ComparisonStat label="مستوى القوة" value1={challenger.powerLevel} value2={opponent.powerLevel} winner={powerWinner} />
                    <ComparisonStat label="الرتبة" value1={challenger.rank} value2={opponent.rank} />
                    <ComparisonStat label="القرية" value1={challenger.village} value2={opponent.village} />
                    <ComparisonStat label="العمر" value1={challenger.age} value2={opponent.age} />
                </div>
             </div>
        </div>
    );
};

const BattlePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [challenger, setChallenger] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [phase, setPhase] = useState('select');
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const challengerId = (location.state)?.challengerId;
        if (!challengerId) {
            navigate('/characters');
            return;
        }
        const foundChallenger = characters.find(c => c.id === challengerId);
        if (foundChallenger) {
            setChallenger(foundChallenger);
        } else {
            navigate('/characters');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (phase === 'intro') {
            const timer = setTimeout(() => {
                if (challenger && opponent) {
                    if (challenger.powerLevel > opponent.powerLevel) {
                        setWinner(challenger);
                    } else if (opponent.powerLevel > challenger.powerLevel) {
                        setWinner(opponent);
                    } else {
                        setIsDraw(true);
                    }
                }
                setPhase('result');
            }, 4000); 
            return () => clearTimeout(timer);
        }
    }, [phase, challenger, opponent]);

    const handleSelectOpponent = (selectedOpponent) => {
        setOpponent(selectedOpponent);
        setPhase('intro');
    };

    const handleReset = () => {
        setOpponent(null);
        setWinner(null);
        setIsDraw(false);
        setPhase('select');
    };

    const availableOpponents = useMemo(() => 
        characters.filter(c => c.id !== challenger?.id && c.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [challenger, searchTerm]
    );

    if (!challenger) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl">جاري تحميل المقاتل...</p>
            </div>
        );
    }
    
    if (phase === 'select') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-10rem)]">
                <div className="flex flex-col items-center justify-center themed-card p-8 rounded-2xl">
                    <h2 className="font-cairo text-3xl font-bold mb-4">المتحدي</h2>
                    <div className="w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/50 mb-6 border-4 border-red-500 shadow-lg">
                        <span className="text-9xl">{challenger.emoji}</span>
                    </div>
                    <h3 className="text-4xl font-black font-cairo">{challenger.name}</h3>
                    <p className="text-lg text-gray-400">{challenger.rank}</p>
                </div>
                <div className="flex flex-col themed-card p-8 rounded-2xl">
                    <h2 className="font-cairo text-3xl font-bold mb-4 text-center">اختر الخصم</h2>
                    <input
                        type="text"
                        placeholder="ابحث عن شينوبي..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 mb-4 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {availableOpponents.map(opp => (
                            <button
                                key={opp.id}
                                onClick={() => handleSelectOpponent(opp)}
                                className="flex flex-col items-center p-3 themed-card rounded-lg hover:bg-purple-900/50 hover:border-purple-500 transition-all duration-200"
                            >
                                <span className="text-5xl mb-2">{opp.emoji}</span>
                                <span className="text-sm font-bold text-center">{opp.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    const FighterDisplay = ({ character, auraClass, isWinner, isLoser, enterAnimation }) => (
        <div className={`relative flex flex-col items-center transition-all duration-500 ${isLoser ? 'loser-dim' : ''} ${phase === 'intro' ? enterAnimation : ''}`}>
             <div className={`p-6 rounded-2xl bg-black/50 border-4 ${isWinner ? 'border-amber-400' : 'border-gray-700'} transition-colors duration-500 ${isWinner ? 'animate-winner-glow' : phase !== 'result' ? auraClass : ''}`}>
                <div className="w-40 h-40 flex items-center justify-center">
                    <span className="text-9xl">{character.emoji}</span>
                </div>
                <h3 className="text-3xl font-black font-cairo text-center mt-4">{character.name}</h3>
            </div>
            {isWinner && <div className="font-cairo text-4xl md:text-6xl font-black text-amber-400 mt-4" style={{filter: 'drop-shadow(0 0 10px #facc15)'}}>الفائز</div>}
        </div>
    );

    return (
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8">
                {challenger && <FighterDisplay character={challenger} auraClass="kyubi-aura" isWinner={winner?.id === challenger.id} isLoser={!!winner && winner.id !== challenger.id} enterAnimation="battle-fighter-enter-left" />}
                
                {phase === 'result' && challenger && opponent ? (
                    <ComparisonView challenger={challenger} opponent={opponent} />
                ) : (
                    <div className="my-8 md:my-0">
                        <span className={`font-black text-7xl md:text-9xl text-red-500 transition-opacity duration-500 ${phase === 'result' ? 'opacity-0' : 'opacity-100 animate-[vs-intro_0.8s_1s_cubic-bezier(0.34,1.56,0.64,1)_backwards]'}`} style={{ WebkitTextStroke: '2px white' }}>VS</span>
                    </div>
                )}
                
                {opponent && <FighterDisplay character={opponent} auraClass="susanoo-aura" isWinner={winner?.id === opponent.id} isLoser={!!winner && winner.id !== opponent.id} enterAnimation="battle-fighter-enter-right" />}
            </div>

            {phase === 'result' && (
                <div className="text-center mt-12 animate-[results-fade-in_1s_ease-out]">
                    {isDraw && <div className="font-cairo text-6xl font-black text-gray-300">تعادل!</div>}
                    <button onClick={handleReset} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">مواجهة جديدة</button>
                </div>
            )}
        </div>
    );
};

export default BattlePage;
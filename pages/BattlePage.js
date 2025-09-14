import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.js';

const ComparisonStat = ({ label, value1, value2, winner }) => {
    const p1Class = winner === 'p1' ? 'winner-text font-bold' : '';
    const p2Class = winner === 'p2' ? 'winner-text font-bold' : '';
    
    return React.createElement(
        'div',
        { className: "grid grid-cols-3 items-center text-center gap-2 md:gap-4 py-2 border-b last:border-b-0 comparison-stat-grid" },
        React.createElement('div', { className: `text-sm md:text-lg ${p1Class}` }, value1),
        React.createElement('div', { className: "text-xs md:text-sm font-semibold label" }, label),
        React.createElement('div', { className: `text-sm md:text-lg ${p2Class}` }, value2)
    );
};

const ComparisonView = ({ challenger, opponent, phase }) => {
    const powerWinner = challenger.powerLevel > opponent.powerLevel ? 'p1' : opponent.powerLevel > challenger.powerLevel ? 'p2' : 'draw';
    
    return React.createElement(
        'div',
        { className: "w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto" },
        React.createElement(
            'div',
            { className: `battle-report-scroll ${phase === 'result' ? 'unfurl' : ''}`},
            React.createElement(
                'h2',
                { className: "text-xl md:text-2xl font-bold text-center mb-4 border-b-2 pb-2" },
                "تقرير المواجهة"
            ),
            React.createElement(
                'div',
                { className: "space-y-1 px-4" },
                React.createElement(ComparisonStat, { label: "مستوى القوة", value1: challenger.powerLevel, value2: opponent.powerLevel, winner: powerWinner }),
                React.createElement(ComparisonStat, { label: "الرتبة", value1: challenger.rank, value2: opponent.rank }),
                React.createElement(ComparisonStat, { label: "القرية", value1: challenger.village, value2: opponent.village }),
                React.createElement(ComparisonStat, { label: "العمر", value1: challenger.age, value2: opponent.age })
            )
        )
    );
};

const BattlePage = () => {
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    const [challenger, setChallenger] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [phase, setPhase] = useState('select');
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const challengerId = location.state?.challengerId;
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
            }, 3000); 
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
        setSearchTerm('');
        setPhase('select');
    };

    const availableOpponents = useMemo(() => 
        characters.filter(c => c.id !== challenger?.id && c.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [challenger, searchTerm]
    );

    if (!challenger) {
        return React.createElement(
            'div',
            { className: "flex items-center justify-center h-screen" },
            React.createElement('p', { className: "text-xl" }, "جاري تحميل المقاتل...")
        );
    }
    
    if (phase === 'select') {
        return React.createElement(
            'div',
            { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-10rem)]" },
            React.createElement(
                'div',
                { className: "flex flex-col items-center justify-center themed-card p-8 rounded-2xl" },
                React.createElement('h2', { className: "font-cairo text-3xl font-bold mb-4" }, "المتحدي"),
                React.createElement(
                    'div',
                    { className: "w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/50 mb-6 border-4 border-red-500 shadow-lg" },
                    React.createElement('span', { className: "text-9xl" }, challenger.emoji)
                ),
                React.createElement('h3', { className: "text-4xl font-black font-cairo" }, challenger.name),
                React.createElement('p', { className: "text-lg text-gray-400" }, challenger.rank)
            ),
            React.createElement(
                'div',
                { className: "flex flex-col themed-card p-8 rounded-2xl" },
                React.createElement('h2', { className: "font-cairo text-3xl font-bold mb-4 text-center" }, "اختر الخصم"),
                React.createElement('input', {
                    type: "text",
                    placeholder: "ابحث عن شينوبي...",
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    className: "w-full px-4 py-2 mb-4 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
                }),
                React.createElement(
                    'div',
                    { className: "flex-grow overflow-y-auto pr-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" },
                    availableOpponents.map(opp => React.createElement(
                        'button',
                        {
                            key: opp.id,
                            onClick: () => handleSelectOpponent(opp),
                            className: "flex flex-col items-center p-3 themed-card rounded-lg hover:bg-purple-900/50 hover:border-purple-500 transition-all duration-200"
                        },
                        React.createElement('span', { className: "text-5xl mb-2" }, opp.emoji),
                        React.createElement('span', { className: "text-sm font-bold text-center" }, opp.name)
                    ))
                )
            )
        );
    }
    
    const FighterDisplay = ({ character, auraClass, isWinner, isLoser, enterAnimation }) => React.createElement(
        'div',
        { className: `relative flex flex-col items-center transition-all duration-500 ${phase === 'result' && isLoser ? 'loser-dim' : ''} ${phase === 'intro' ? enterAnimation : ''}` },
        React.createElement(
            'div',
            { className: `p-6 rounded-2xl bg-black/50 border-4 ${isWinner ? 'border-amber-400' : 'border-gray-700'} transition-colors duration-500 ${isWinner ? 'animate-winner-glow' : phase !== 'result' ? auraClass : ''}` },
            React.createElement(
                'div',
                { className: "w-40 h-40 flex items-center justify-center" },
                React.createElement('span', { className: "text-9xl" }, character.emoji)
            ),
            React.createElement('h3', { className: "text-3xl font-black font-cairo text-center mt-4" }, character.name)
        ),
        isWinner && React.createElement('div', { className: "font-cairo text-4xl md:text-6xl font-black text-amber-400 mt-4", style: { filter: 'drop-shadow(0 0 10px #facc15)' } }, "الفائز")
    );

    return React.createElement(
        'div',
        { className: "flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full overflow-hidden" },
        React.createElement(
            'div',
            { className: "flex flex-col md:flex-row items-center justify-around w-full gap-8" },
            challenger && React.createElement(FighterDisplay, { character: challenger, auraClass: "kyubi-aura", isWinner: winner?.id === challenger.id, isLoser: !!winner && winner.id !== challenger.id, enterAnimation: "battle-fighter-enter-left" }),
            React.createElement(
                'div',
                { className: "my-8 md:my-0" },
                 phase === 'result' && challenger && opponent ? (
                    React.createElement(ComparisonView, { challenger: challenger, opponent: opponent, phase: phase })
                ) : (
                    React.createElement('span', { className: `font-black text-7xl md:text-9xl text-red-500 transition-opacity duration-500 ${phase === 'result' ? 'opacity-0' : 'opacity-100 animate-[vs-intro_0.8s_1s_cubic-bezier(0.34,1.56,0.64,1)_backwards]'}`, style: { WebkitTextStroke: '2px white' } }, "VS")
                )
            ),
            opponent && React.createElement(FighterDisplay, { character: opponent, auraClass: "susanoo-aura", isWinner: winner?.id === opponent.id, isLoser: !!winner && winner.id !== opponent.id, enterAnimation: "battle-fighter-enter-right" })
        ),
        phase === 'result' && React.createElement(
            'div',
            { className: "text-center mt-12 animate-[cinematic-fade-in_1s_3s_backwards]" },
            isDraw && React.createElement('div', { className: "font-cairo text-6xl font-black text-gray-300" }, "تعادل!"),
            React.createElement(
                'button',
                { onClick: handleReset, className: "mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg" },
                "مواجهة جديدة"
            )
        )
    );
};

export default BattlePage;

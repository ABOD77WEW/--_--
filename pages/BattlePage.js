import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.js';

const BattlePage = () => {
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

    const [challenger, setChallenger] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [phase, setPhase] = useState('select'); // 'select', 'intro', 'result'
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
                    if (challenger.powerLevel > opponent.powerLevel) setWinner(challenger);
                    else if (opponent.powerLevel > challenger.powerLevel) setWinner(opponent);
                    else setIsDraw(true);
                }
                setPhase('result');
            }, 3000); // Duration of the clash animation
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
            'div', { className: "flex items-center justify-center h-screen" },
            React.createElement('p', { className: "text-xl" }, "جاري تحميل المقاتل...")
        );
    }

    // --- RENDER LOGIC ---

    if (phase === 'select') {
        return React.createElement(
            'div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-10rem)]" },
            React.createElement(
                'div', { className: "challenger-display flex flex-col items-center justify-center themed-card p-8 rounded-2xl" },
                React.createElement('h2', { className: "font-cairo text-3xl font-bold mb-4" }, "المتحدي"),
                React.createElement(
                    'div', { className: "w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/50 mb-6 border-4 border-red-500 kyubi-aura" },
                    React.createElement('span', { className: "text-9xl" }, challenger.emoji)
                ),
                React.createElement('h3', { className: "text-4xl font-black font-cairo" }, challenger.name),
                React.createElement('p', { className: "text-lg text-gray-400" }, challenger.rank)
            ),
            React.createElement(
                'div', { className: "opponent-selection-scroll flex flex-col p-8 rounded-2xl" },
                React.createElement('h2', { className: "font-cairo text-3xl font-bold mb-4 text-center" }, "مخطوطة الاستدعاء: اختر خصمك"),
                React.createElement('input', {
                    type: "text",
                    placeholder: "ابحث عن شينوبي...",
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    className: "w-full px-4 py-2 mb-4 bg-[#d1c4a8] border-2 border-[#8a6d4e] rounded-lg focus:outline-none focus:border-[#4a2e2e] text-[#4a2e2e] placeholder:text-[#6b4f4f]"
                }),
                React.createElement(
                    'div', { className: "flex-grow overflow-y-auto pr-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" },
                    availableOpponents.map(opp => React.createElement(
                        'button', {
                            key: opp.id,
                            onClick: () => handleSelectOpponent(opp),
                            className: "opponent-card flex flex-col items-center p-3 bg-black/5 rounded-lg border border-transparent hover:border-[#4a2e2e] hover:bg-black/10 transition-all duration-200"
                        },
                        React.createElement('span', { className: "text-5xl mb-2" }, opp.emoji),
                        React.createElement('span', { className: "text-sm font-bold text-center" }, opp.name)
                    ))
                )
            )
        );
    }

    const FighterDisplay = ({ character, auraClass, isWinner, isLoser, enterAnimation }) => React.createElement(
        'div', {
            className: `relative flex flex-col items-center transition-all duration-1000 ${phase === 'result' && isLoser ? 'loser-disintegrate' : ''} ${phase === 'intro' ? enterAnimation : ''}`
        },
        React.createElement(
            'div', { className: `p-6 rounded-2xl bg-black/50 border-4 ${isWinner ? 'border-amber-400 winner-glow-strong' : 'border-gray-700'} ${phase !== 'result' ? auraClass : ''}` },
            React.createElement(
                'div', { className: "w-40 h-40 flex items-center justify-center" },
                React.createElement('span', { className: "text-9xl" }, character.emoji)
            ),
            React.createElement('h3', { className: "text-3xl font-black font-cairo text-center mt-4" }, character.name)
        ),
        phase === 'result' && isWinner && React.createElement(
            'div', { className: "font-cairo text-4xl md:text-6xl font-black text-amber-400 mt-4 animate-[cinematic-fade-in_1s_1s_backwards]", style: { filter: 'drop-shadow(0 0 10px #facc15)' } },
            "الفائز"
        )
    );

    return React.createElement(
        'div', { className: "flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] w-full overflow-hidden" },
        React.createElement(
            'div', { className: "flex flex-col md:flex-row items-center justify-around w-full gap-8" },
            challenger && React.createElement(FighterDisplay, {
                character: challenger,
                auraClass: "kyubi-aura",
                isWinner: winner?.id === challenger.id,
                isLoser: !!winner && winner.id !== challenger.id,
                enterAnimation: "battle-fighter-enter-left"
            }),
            phase === 'intro' && React.createElement(
                'div', { className: "absolute z-10" },
                React.createElement('div', { className: "chakra-clash-shockwave w-screen h-screen rounded-full border-[10px] border-white/50" }),
                React.createElement('span', { className: `chakra-clash-container font-black text-7xl md:text-9xl text-red-500`, style: { WebkitTextStroke: '2px white' } }, "VS")
            ),
            opponent && React.createElement(FighterDisplay, {
                character: opponent,
                auraClass: "susanoo-aura",
                isWinner: winner?.id === opponent.id,
                isLoser: !!winner && winner.id !== opponent.id,
                enterAnimation: "battle-fighter-enter-right"
            })
        ),
        phase === 'result' && React.createElement(
            'div', { className: "text-center mt-12 animate-[cinematic-fade-in_1s_1.5s_backwards]" },
            isDraw && React.createElement('div', { className: "font-cairo text-6xl font-black text-gray-300 mb-4" }, "تعادل!"),
            React.createElement(
                'button', { onClick: handleReset, className: "bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg" },
                "مواجهة جديدة"
            )
        )
    );
};

export default BattlePage;

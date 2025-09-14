import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.js';

// Main Component
const BattlePage = () => {
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();

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
        const currentChallengerId = challenger?.id;
        setOpponent(null);
        setSearchTerm('');
        setPhase('select');
        navigate('/battle', { state: { challengerId: currentChallengerId }, replace: true });
    };

    const availableOpponents = useMemo(() =>
        characters.filter(c => c.id !== challenger?.id && c.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [challenger, searchTerm]
    );

    if (!challenger) {
        return React.createElement(
            'div', 
            { className: "flex items-center justify-center min-h-[calc(100vh-10rem)]" }, 
            React.createElement('p', { className: "text-xl" }, "جاري استدعاء المتحدي...")
        );
    }
    
    const renderPhase = () => {
        switch(phase) {
            case 'select':
                return React.createElement(SelectionPhase, {
                    challenger: challenger,
                    opponents: availableOpponents,
                    searchTerm: searchTerm,
                    onSearchTermChange: setSearchTerm,
                    onSelectOpponent: handleSelectOpponent
                });
            case 'intro':
                 return React.createElement(IntroPhase, { challenger, opponent });
            case 'result':
                return React.createElement(ResultPhase, {
                    challenger,
                    opponent,
                    onReset: handleReset
                });
            default:
                return null;
        }
    };

    return React.createElement(
        'div', 
        { className: "battle-page-container" },
        renderPhase()
    );
};

// Sub-components for each phase
const SelectionPhase = ({ challenger, opponents, searchTerm, onSearchTermChange, onSelectOpponent }) => React.createElement(
    'div', { className: "battle-selection-grid" },
    React.createElement(
        'div', { className: "challenger-pod" },
        React.createElement('h2', { className: "pod-title" }, "المتحدي"),
        React.createElement(
            'div', { className: "pod-emoji-container border-red-500" },
            React.createElement('span', { className: "text-9xl" }, challenger.emoji)
        ),
        React.createElement('h3', { className: "pod-name" }, challenger.name),
        React.createElement('p', { className: "pod-rank" }, challenger.rank)
    ),
    React.createElement(
        'div', { className: "opponent-scroll-container" },
        React.createElement('h2', { className: "scroll-title" }, "لفافة الشينوبي: اختر خصمك"),
        React.createElement('input', {
            type: "text",
            placeholder: "ابحث عن مقاتل...",
            value: searchTerm,
            onChange: (e) => onSearchTermChange(e.target.value),
            className: "scroll-search-input"
        }),
        React.createElement(
            'div', { className: "scroll-list" },
            opponents.length > 0 
                ? opponents.map(opp => React.createElement(
                    'button', 
                    { key: opp.id, onClick: () => onSelectOpponent(opp), className: "scroll-opponent-card" },
                    React.createElement('span', { className: "text-5xl" }, opp.emoji),
                    React.createElement('span', { className: "scroll-opponent-name" }, opp.name)
                )) 
                : React.createElement('p', { className: "text-center text-[#9a8e7a] p-4" }, "لم يتم العثور على شينوبي.")
        )
    )
);

const IntroPhase = ({ challenger, opponent }) => React.createElement(
    'div', { className: "battle-intro-container" },
    React.createElement(
        'div', { className: "fighter-intro-pod left" },
        React.createElement('div', { className: "chakra-burst kyubi-burst" }),
        React.createElement('span', { className: "text-9xl" }, challenger.emoji)
    ),
    React.createElement(
        'div', { className: "fighter-intro-pod right" },
        React.createElement('div', { className: "chakra-burst susanoo-burst" }),
        React.createElement('span', { className: "text-9xl" }, opponent.emoji)
    ),
    React.createElement(
        'div', { className: "cosmic-clash-center" },
        React.createElement('div', { className: "cosmic-clash-explosion" }),
        React.createElement('div', { className: "cosmic-clash-shockwave" })
    )
);

const ResultPhase = ({ challenger, opponent, onReset }) => {
    const isDraw = challenger.powerLevel === opponent.powerLevel;
    const winner = isDraw ? null : (challenger.powerLevel > opponent.powerLevel ? challenger : opponent);

    return React.createElement(
        'div', { className: "battle-result-container" },
        React.createElement(
            'div', { className: "result-fighters-grid" },
            React.createElement(FighterResultPod, { character: challenger, isWinner: winner?.id === challenger.id, isLoser: !!winner && winner.id !== challenger.id }),
            React.createElement(FighterResultPod, { character: opponent, isWinner: winner?.id === opponent.id, isLoser: !!winner && winner.id !== opponent.id })
        ),
        isDraw && React.createElement('div', { className: "draw-announcement" }, "تعادل!"),
        React.createElement(
            'div', { className: "result-cards-grid" },
             React.createElement(ResultCard, { character: challenger, opponent: opponent }),
             React.createElement(ResultCard, { character: opponent, opponent: challenger })
        ),
        React.createElement('button', { onClick: onReset, className: "new-battle-button" }, "مواجهة جديدة")
    );
};

// Helper components for phases
const FighterResultPod = ({ character, isWinner, isLoser }) => React.createElement(
    'div', { className: `fighter-result-pod ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}` },
    isWinner && React.createElement('div', { className: "winner-announcement" }, "الفائز"),
    React.createElement(
        'div', { className: `pod-emoji-container-result ${isWinner ? 'border-amber-400 winner-aura-strong' : 'border-gray-700'}` },
        React.createElement('span', { className: "text-9xl" }, character.emoji)
    ),
    React.createElement('h3', { className: "pod-name-result" }, character.name)
);

const ResultCard = ({ character, opponent }) => {
    const isWinner = character.powerLevel > opponent.powerLevel;
    const powerLevelClass = isWinner ? 'text-amber-400 font-black' : 'text-white';
    
    return React.createElement(
        'div', { className: `battle-result-card ${isWinner ? 'winner-card' : ''}` },
        React.createElement('h4', { className: "result-card-title" }, character.name),
        React.createElement(
            'div', { className: "result-card-stats" },
            React.createElement(
                'div', { className: "stat-row" },
                React.createElement('span', { className: "stat-label" }, "مستوى القوة"),
                React.createElement('span', { className: `stat-value ${powerLevelClass}` }, character.powerLevel)
            ),
            React.createElement(
                'div', { className: "stat-row" },
                React.createElement('span', { className: "stat-label" }, "الرتبة"),
                React.createElement('span', { className: "stat-value" }, character.rank)
            ),
            React.createElement(
                'div', { className: "stat-row" },
                React.createElement('span', { className: "stat-label" }, "القرية"),
                React.createElement('span', { className: "stat-value" }, character.village)
            ),
             React.createElement(
                'div', { className: "stat-column" },
                React.createElement('span', { className: "stat-label-col" }, "القدرات الرئيسية"),
                React.createElement(
                    'ul', { className: "stat-list" },
                    character.abilities.slice(0, 3).map(ability => React.createElement('li', { key: ability }, ability))
                )
            )
        )
    );
};

export default BattlePage;

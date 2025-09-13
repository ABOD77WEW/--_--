import React, { useEffect } from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

const DetailViewExitButton = ({ onClick }) => React.createElement(
    'button',
    {
        onClick: onClick,
        className: "detail-exit-button",
        "aria-label": "إغلاق",
        title: "إغلاق"
    },
    React.createElement(
        'svg',
        { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
    )
);

const CharacterDetail = ({ item }) => React.createElement(
    'div',
    { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right" },
    React.createElement(
        'div',
        { className: "flex flex-col items-center md:col-span-1" },
        React.createElement(
            'div',
            { className: "w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/10 mb-6 border-4 border-red-900/50 shadow-lg" },
            React.createElement('span', { className: "text-9xl", style: { filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' } }, item.emoji)
        )
    ),
    React.createElement(
        'div',
        { className: "md:col-span-2" },
        React.createElement('h1', { className: "text-5xl font-cairo font-black text-[#6b4f4f]" }, item.name),
        React.createElement(
            'div',
            { className: "flex items-center justify-center md:justify-end gap-2 my-3" },
            React.createElement('span', { className: "px-3 py-1 text-sm font-semibold rounded-full bg-red-900/20 text-red-900" }, item.village),
            React.createElement('span', { className: "px-3 py-1 text-sm font-semibold rounded-full bg-gray-500/20 text-gray-800" }, item.rank)
        ),
        React.createElement('div', { className: "scroll-ink-divider" }),
        React.createElement(
            'blockquote',
            { className: "text-lg italic text-gray-800/80 border-r-4 border-red-900/50 pr-4 my-6" },
            `"${item.quote}"`
        ),
        React.createElement(
            'div',
            { className: "mb-4" },
            React.createElement('h3', { className: "font-cairo font-bold text-xl mb-2" }, "مستوى القوة"),
            React.createElement(
                'div',
                { className: "w-full bg-black/10 rounded-full h-6" },
                React.createElement(
                    'div',
                    {
                        className: "bg-gradient-to-r from-purple-800 to-red-700 h-6 rounded-full text-center text-white font-bold flex items-center justify-center",
                        style: { width: `${item.powerLevel * 10}%` }
                    },
                    `${item.powerLevel}/10`
                )
            )
        ),
        React.createElement(
            'div',
            { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4" },
            React.createElement(
                'div',
                null,
                React.createElement('h3', { className: "font-cairo font-bold text-xl mb-2" }, "القدرات"),
                React.createElement(
                    'ul',
                    { className: "list-disc list-inside space-y-1 text-gray-800/90" },
                    item.abilities.map(ability => React.createElement('li', { key: ability }, ability))
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement('h3', { className: "font-cairo font-bold text-xl mb-2" }, "الفريق"),
                React.createElement(
                    'ul',
                    { className: "list-disc list-inside space-y-1 text-gray-800/90" },
                    item.team.map(t => React.createElement('li', { key: t }, t))
                )
            )
        )
    )
);

const ArcDetail = ({ item }) => React.createElement(
    'div',
    { className: "text-center" },
    React.createElement(
        'div',
        { className: "w-48 h-48 flex items-center justify-center rounded-full bg-gray-700/10 mb-6 border-4 border-blue-900/50 shadow-lg mx-auto" },
        React.createElement('span', { className: "text-9xl" }, item.emoji)
    ),
    React.createElement('h1', { className: "text-5xl font-cairo font-black text-[#4a2e2e]" }, item.name),
    React.createElement('p', { className: "font-mono text-lg text-gray-800/70 my-2" }, item.episodeRange),
    React.createElement('div', { className: "scroll-ink-divider" }),
    React.createElement('p', { className: "text-lg text-gray-800/90 leading-relaxed text-right" }, item.summary)
);

const EyeDetail = ({ item }) => {
    const SvgIcon = item.svg;
    return React.createElement(
        'div',
        { className: "text-center" },
        React.createElement(
            'div',
            { className: "w-48 h-48 mb-6 mx-auto" },
            React.createElement(SvgIcon, { className: "w-full h-full text-red-800", style: { filter: 'drop-shadow(0 0 15px rgba(185, 28, 28, 0.4))' } })
        ),
        React.createElement('h1', { className: "text-5xl font-cairo font-black text-[#4a2e2e]" }, item.name),
        React.createElement('p', { className: "text-lg text-gray-800/70 my-2" }, item.description),
        React.createElement('div', { className: "scroll-ink-divider" }),
        React.createElement('p', { className: "text-lg text-gray-800/90 leading-relaxed text-right" }, item.summary)
    );
};

const ClanDetail = ({ item }) => {
    const Symbol = item.symbol;
    return React.createElement(
        'div',
        { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right" },
        React.createElement(
            'div',
            { className: "flex flex-col items-center md:col-span-1" },
            React.createElement(
                'div',
                { className: "w-48 h-48 p-4 flex items-center justify-center mb-6" },
                React.createElement(Symbol, { className: "w-full h-full text-gray-800/80" })
            )
        ),
        React.createElement(
            'div',
            { className: "md:col-span-2" },
            React.createElement('h1', { className: "text-5xl font-cairo font-black text-[#4a2e2e]" }, item.name),
            React.createElement('div', { className: "scroll-ink-divider my-4" }),
            React.createElement('p', { className: "text-lg text-gray-800/90 mb-6" }, item.summary),
            React.createElement(
                'div',
                null,
                React.createElement('h3', { className: "font-cairo font-bold text-xl mb-2 border-r-4 border-gray-900/20 pr-3" }, "أبرز الأعضاء"),
                React.createElement(
                    'div',
                    { className: "flex flex-wrap gap-2 justify-center md:justify-start" },
                    item.members.map(member => React.createElement('span', { key: member, className: "px-3 py-1 text-sm font-semibold rounded-full bg-gray-500/20 text-gray-800" }, member))
                )
            )
        )
    );
};


const FullScreenDetailView = () => {
    const { isDetailViewOpen, detailViewContent, closeDetailView } = useShinobiPro();
    
    useEffect(() => {
        const handleKeyDown = (event) => {
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
            case 'characters': return React.createElement(CharacterDetail, { item: item });
            case 'arcs': return React.createElement(ArcDetail, { item: item });
            case 'eyes': return React.createElement(EyeDetail, { item: item });
            case 'clans': return React.createElement(ClanDetail, { item: item });
            default: return React.createElement('div', null, 'تفاصيل غير معروفة');
        }
    }

    return React.createElement(
        'div',
        { className: "scroll-view-container", onClick: closeDetailView },
        React.createElement(
            'div',
            { className: "scroll-view-content", onClick: (e) => e.stopPropagation() },
            React.createElement(DetailViewExitButton, { onClick: closeDetailView }),
            React.createElement(
                'div',
                { className: "scroll-view-content-inner" },
                renderContent()
            )
        )
    );
};

export default FullScreenDetailView;
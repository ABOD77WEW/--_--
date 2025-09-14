import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import GlobalSearchBar from '../components/GlobalSearchBar.js';
import { UserGroupIcon, FilmIcon, EyeIcon, FlagIcon } from '@heroicons/react/24/solid';

const HomePage = () => {
    const quickLinks = [
        { to: '/characters', icon: UserGroupIcon, name: 'الشخصيات', description: "استكشف أبطال وأشرار عالم الشينوبي." },
        { to: '/arcs', icon: FilmIcon, name: 'الآركات', description: "تتبع رحلة ناروتو عبر الأحداث." },
        { to: '/eyes', icon: EyeIcon, name: 'العيون', description: "اكتشف أسرار أقوى التقنيات البصرية." },
        { to: '/clans', icon: FlagIcon, name: 'العشائر', description: "تعرف على القوى التي شكلت العالم." },
    ];

    const QuickLookCard = ({ to, icon: Icon, name, description }) => React.createElement(
        ReactRouterDOM.Link,
        { to: to, className: 'quick-look-card rounded-xl p-6 text-right' },
        React.createElement(
            'div', { className: 'relative z-10' },
            React.createElement(
                'div', { className: 'flex items-center gap-4 mb-3' },
                React.createElement(
                    'div', { className: 'p-3 rounded-lg bg-black/30' },
                    React.createElement(Icon, { className: 'w-8 h-8 text-purple-300' })
                ),
                React.createElement('h4', { className: 'font-cairo font-bold text-2xl' }, name)
            ),
            React.createElement('p', { className: 'text-gray-400 font-tajawal' }, description)
        )
    );

    return React.createElement(
        'div',
        { className: "text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]" },
        React.createElement(
            'div', { className: "relative", style: { animation: 'cinematic-fade-in 1s backwards' } },
            React.createElement(
                'h1', {
                    className: "font-cairo text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-white",
                    style: { WebkitTextStroke: '2px var(--accent-dark)' }
                },
                "忍"
            ),
            React.createElement(
                'h1', {
                    className: "font-cairo text-9xl md:text-[12rem] font-black absolute inset-0 text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-white opacity-40 blur-xl"
                },
                "忍"
            )
        ),
        React.createElement(
            'h2', { className: "font-cairo text-4xl md:text-5xl font-bold mt-4 tracking-wider text-white", style: { animation: 'cinematic-fade-in 1s 0.2s backwards' } },
            "موسوعة الشينوبي"
        ),
        React.createElement(
            'p', { className: "font-tajawal text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 mb-8", style: { animation: 'cinematic-fade-in 1s 0.3s backwards' } },
            "استكشف أعمق أسرار عالم النينجا. الشخصيات، العشائر، والتقنيات المحرمة، كلها في مكان واحد."
        ),
        React.createElement(
            'div', { className: 'w-full max-w-xl my-8', style: { animation: 'cinematic-fade-in 1s 0.4s backwards' } },
            React.createElement(GlobalSearchBar)
        ),
        React.createElement(
            'section', { className: 'quick-look-section w-full max-w-5xl mt-12' },
            React.createElement(
                'h3', { className: 'font-cairo text-3xl font-bold mb-6' }, 'لمحة سريعة'
            ),
            React.createElement(
                'div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
                quickLinks.map(link => React.createElement(QuickLookCard, { key: link.to, ...link }))
            )
        )
    );
};

export default HomePage;
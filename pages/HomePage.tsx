import React from 'react';
// FIX: Switched from require to a standard ES module import for react-router-dom to fix module resolution error.
import { Link } from 'react-router-dom';
import GlobalSearchBar from '../components/GlobalSearchBar.tsx';
import { UserGroupIcon, FilmIcon, EyeIcon, FlagIcon } from '@heroicons/react/24/solid';

const HomePage = () => {
    const quickLinks = [
        { to: '/characters', icon: UserGroupIcon, name: 'الشخصيات', description: "استكشف أبطال وأشرار عالم الشينوبي." },
        { to: '/arcs', icon: FilmIcon, name: 'الآركات', description: "تتبع رحلة ناروتو عبر الأحداث." },
        { to: '/eyes', icon: EyeIcon, name: 'العيون', description: "اكتشف أسرار أقوى التقنيات البصرية." },
        { to: '/clans', icon: FlagIcon, name: 'العشائر', description: "تعرف على القوى التي شكلت العالم." },
    ];

    // FIX: Property 'Link' does not exist on type 'typeof import...'.
    const QuickLookCard = ({ to, icon: Icon, name, description }) => (
        <Link to={to} className="quick-look-card rounded-xl p-6 text-right">
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-lg bg-black/30">
                        <Icon className="w-8 h-8 text-purple-300" />
                    </div>
                    <h4 className="font-cairo font-bold text-2xl">{name}</h4>
                </div>
                <p className="text-gray-400 font-tajawal">{description}</p>
            </div>
        </Link>
    );

    return (
        <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <div className="relative" style={{ animation: 'cinematic-fade-in 1s backwards' }}>
                <h1 
                    className="font-cairo text-9xl md:text-[12rem] font-black text-transparent bg-clip-text 
                               bg-gradient-to-br from-gray-300 to-white"
                    style={{ WebkitTextStroke: '2px var(--accent-dark)' }}
                >
                    忍
                </h1>
                <h1 
                    className="font-cairo text-9xl md:text-[12rem] font-black absolute inset-0 text-transparent bg-clip-text 
                               bg-gradient-to-br from-gray-300 to-white opacity-40 blur-xl"
                >
                    忍
                </h1>
            </div>
            <h2 className="font-cairo text-4xl md:text-5xl font-bold mt-4 tracking-wider text-white" style={{ animation: 'cinematic-fade-in 1s 0.2s backwards' }}>
                موسوعة الشينوبي
            </h2>
            <p className="font-tajawal text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-4 mb-8" style={{ animation: 'cinematic-fade-in 1s 0.3s backwards' }}>
                استكشف أعمق أسرار عالم النينجا. الشخصيات، العشائر، والتقنيات المحرمة، كلها في مكان واحد.
            </p>

            <div className="w-full max-w-xl my-8" style={{ animation: 'cinematic-fade-in 1s 0.4s backwards' }}>
                <GlobalSearchBar />
            </div>

            <section className="quick-look-section w-full max-w-5xl mt-12">
                <h3 className="font-cairo text-3xl font-bold mb-6">لمحة سريعة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickLinks.map(link => <QuickLookCard key={link.to} {...link} />)}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
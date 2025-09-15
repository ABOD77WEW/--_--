import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.js';
import { ScaleIcon, SwatchIcon, PencilSquareIcon, SpeakerWaveIcon, KeyIcon } from '@heroicons/react/24/solid';

const proThemes = [
    { id: 'theme-akatsuki', name: 'الأكاتسوكي', class: 'preview-akatsuki', description: 'انغمس في ظلام الأكاتسوكي مع هذا المظهر الأيقوني.' },
    { id: 'theme-war', name: 'حرب الشينوبي', class: 'preview-war', description: 'استشعر حرارة المعركة مع خلفية صحراوية مليئة بالغبار.' },
    { id: 'theme-mist', name: 'قرية الضباب', class: 'preview-mist', description: 'أحِط نفسك بالغموض مع أجواء الضباب والمطر الخفيف.' },
];

const FeaturesPage = () => {
  const { isPro, setBackgroundTheme } = useShinobiPro();
  const navigate = ReactRouterDOM.useNavigate();

  useEffect(() => {
    if (!isPro) {
      navigate('/');
    }
  }, [isPro, navigate]);

  if (!isPro) {
    return null;
  }

  return React.createElement(
    'div',
    { className: "flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] w-full" },
    React.createElement(
        'div', { className: "features-hero w-full max-w-4xl text-center" },
        React.createElement(KeyIcon, { className: "w-24 h-24 mx-auto text-amber-400", style: {filter: 'drop-shadow(0 0 15px #fbbF24)', transform: 'rotate(-45deg)'} }),
        React.createElement('h1', { className: "font-cairo text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-orange-500 mt-4 mb-2" }, "مخطوطات النخبة"),
        React.createElement('p', { className: "font-tajawal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto" }, "لقد أثبتّ جدارتك. هذه الأدوات والتحليلات الحصرية تحت إمرتك الآن.")
    ),
    React.createElement(
        'div', { className: "w-full max-w-5xl space-y-8" },
        React.createElement(
            'div', { className: "feature-card-pro", style: { '--hover-color': '#c084fc' } },
            React.createElement(
                'div', { className: "feature-content text-right" },
                React.createElement(
                    'div', { className: "flex items-center justify-end gap-3 mb-4" },
                    React.createElement('h3', { className: "font-cairo text-3xl font-bold text-purple-300" }, "الخلفيات الحصرية"),
                    React.createElement(SwatchIcon, { className: "w-8 h-8" })
                ),
                React.createElement('p', { className: "text-gray-400 mb-6" }, "غيّر أجواء الموسوعة بالكامل. اختر من بين هذه الخلفيات المصممة خصيصًا لأعضاء برو. انقر للتجربة."),
                React.createElement(
                    'div', { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
                    proThemes.map(theme => React.createElement(
                        'button', { key: theme.id, onClick: () => setBackgroundTheme(theme.id), className: "text-right transition-transform hover:scale-105 p-2 rounded-lg hover:bg-white/5" },
                        React.createElement(
                            'div', { className: `feature-theme-preview ${theme.class}` },
                            React.createElement('div', { className: "pro-badge" }, "PRO")
                        ),
                        React.createElement('h4', { className: "font-cairo font-bold text-lg" }, theme.name),
                        React.createElement('p', { className: "text-sm text-gray-500" }, theme.description)
                    ))
                )
            )
        ),
        React.createElement(
            ReactRouterDOM.Link, { to: "/battle", state: { from: "features" } },
            React.createElement(
                'div', { className: "feature-card-pro", style: { '--hover-color': '#22c55e' } },
                React.createElement(
                    'div', { className: "feature-content text-right" },
                    React.createElement(
                        'div', { className: "flex items-center justify-end gap-3" },
                        React.createElement('h3', { className: "font-cairo text-3xl font-bold text-green-400" }, "ساحة المعركة"),
                        React.createElement(ScaleIcon, { className: "w-8 h-8" })
                    ),
                    React.createElement('p', { className: "text-gray-400 mt-2" }, "ضع أي شينوبي ضد آخر في مواجهة ملحمية. حلل إحصائياتهم، قدراتهم، واحسم الجدل حول من هو الأقوى.")
                )
            )
        ),
        React.createElement(
            'div', { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
            React.createElement(
                'div', { className: "feature-card-pro opacity-60 cursor-not-allowed", style: { '--hover-color': '#3b82f6' } },
                React.createElement(
                    'div', { className: "feature-content text-right" },
                    React.createElement(
                        'div', { className: "flex items-center justify-end gap-3" },
                        React.createElement('h3', { className: "font-cairo text-2xl font-bold text-blue-400" }, "منشئ الجتسو"),
                        React.createElement(PencilSquareIcon, { className: "w-7 h-7" })
                    ),
                    React.createElement('p', { className: "text-gray-500 mt-2" }, "قريباً: أطلق العنان لإبداعك وصمم تقنيات النينجا الخاصة بك.")
                )
            ),
            React.createElement(
                'div', { className: "feature-card-pro opacity-60 cursor-not-allowed", style: { '--hover-color': '#8b5cf6' } },
                React.createElement(
                    'div', { className: "feature-content text-right" },
                    React.createElement(
                        'div', { className: "flex items-center justify-end gap-3" },
                        React.createElement('h3', { className: "font-cairo text-2xl font-bold text-indigo-400" }, "لوحة الأصوات"),
                        React.createElement(SpeakerWaveIcon, { className: "w-7 h-7" })
                    ),
                    React.createElement('p', { className: "text-gray-500 mt-2" }, "قريباً: استمع للاقتباسات وأصوات التقنيات الأيقونية.")
                )
            )
        )
    )
  );
};

export default FeaturesPage;
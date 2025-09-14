import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.js';
import ForbiddenScrollIcon from '../components/icons/ForbiddenScrollIcon.js';
import { ScaleIcon, SwatchIcon, PencilSquareIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

const FeaturesPage = () => {
  const { isPro } = useShinobiPro();
  const navigate = ReactRouterDOM.useNavigate();

  useEffect(() => {
    if (!isPro) {
      navigate('/');
    }
  }, [isPro, navigate]);

  if (!isPro) {
    return null; 
  }

  const FeatureCard = ({ to, state, icon: Icon, iconColor, borderColor, shadowColor, title, description, badge }) => React.createElement(
      ReactRouterDOM.Link,
      { to: to, state: state, className: "block" },
      React.createElement(
          'div',
          { className: `bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition ${borderColor} ${shadowColor}` },
          React.createElement(
              'h3',
              { className: `font-cairo text-2xl font-bold ${iconColor} mb-2 flex items-center justify-end gap-3` },
              title,
              badge && React.createElement('span', {className: `text-xs ${badge.bg} ${badge.text} px-2 py-0.5 rounded-full`}, "قريباً"),
              React.createElement(Icon, { className: "w-7 h-7" })
          ),
          React.createElement('p', { className: "text-gray-400" }, description)
      )
  );

  const StaticFeatureCard = ({ icon: Icon, iconColor, borderColor, shadowColor, title, description, badge }) => React.createElement(
      'div',
      { className: `bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition ${borderColor} ${shadowColor} ${badge ? 'opacity-70' : ''}` },
      React.createElement(
          'h3',
          { className: `font-cairo text-2xl font-bold ${iconColor} mb-2 flex items-center justify-end gap-3` },
          title,
          badge && React.createElement('span', {className: `text-xs ${badge.bg} ${badge.text} px-2 py-0.5 rounded-full`}, "قريباً"),
          React.createElement(Icon, { className: "w-7 h-7" })
      ),
      React.createElement('p', { className: "text-gray-400" }, description)
  );

  return React.createElement(
    'div',
    { className: "text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] -mt-16" },
    React.createElement(
      'div',
      { className: "relative mb-6" },
      React.createElement(ForbiddenScrollIcon, { className: "w-24 h-24 text-amber-400", style: { filter: 'drop-shadow(0 0 15px #fbbF24)' } })
    ),
    React.createElement(
      'h1',
      { className: "font-cairo text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-orange-500 mb-4" },
      "مخطوطات المعرفة السرية"
    ),
    React.createElement(
      'p',
      { className: "font-tajawal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-2 mb-8" },
      "بصفتك عضو \"برو\"، هذه الأدوات والتحليلات الحصرية تحت إمرتك الآن."
    ),
    React.createElement(
      'div',
      { className: "w-full max-w-4xl space-y-6" },
      React.createElement(FeatureCard, {
        to: "/battle",
        state: { from: "features" },
        icon: ScaleIcon,
        iconColor: "text-green-400",
        borderColor: "hover:border-green-400/50",
        shadowColor: "hover:shadow-xl hover:shadow-green-500/20",
        title: "مقارنة الشخصيات",
        description: "خاصية حصرية تتيح لك وضع أي شينوبي ضد آخر في مواجهة ملحمية. حلل إحصائياتهم، قدراتهم، واحسم الجدل حول من هو الأقوى."
      }),
      React.createElement(StaticFeatureCard, {
        icon: SwatchIcon,
        iconColor: "text-red-400",
        borderColor: "hover:border-red-400/50",
        shadowColor: "hover:shadow-xl hover:shadow-red-500/20",
        title: "مظهر الأكاتسوكي",
        description: "اغمر نفسك في ظلام الأكاتسوكي. قم بتفعيل المظهر الحصري الذي يغير شكل الموسوعة بالكامل إلى طابع السحابة الحمراء الأيقوني."
      }),
      React.createElement(StaticFeatureCard, {
        icon: PencilSquareIcon,
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-400/50",
        shadowColor: "hover:shadow-xl hover:shadow-blue-500/20",
        title: "منشئ الجتسو",
        description: "أطلق العنان لإبداعك. صمم تقنيات النينجا الخاصة بك، حدد طبيعة التشاكرا، الرتبة، والتأثيرات.",
        badge: { bg: 'bg-blue-900/80', text: 'text-blue-300' }
      }),
      React.createElement(StaticFeatureCard, {
        icon: SpeakerWaveIcon,
        iconColor: "text-indigo-400",
        borderColor: "hover:border-indigo-400/50",
        shadowColor: "hover:shadow-xl hover:shadow-indigo-500/20",
        title: "لوحة أصوات الشينوبي",
        description: "استمع إلى أشهر صرخات المعارك، أصوات التقنيات، والاقتباسات الأيقونية من شخصياتك المفضلة.",
        badge: { bg: 'bg-indigo-900/80', text: 'text-indigo-300' }
      })
    )
  );
};

export default FeaturesPage;

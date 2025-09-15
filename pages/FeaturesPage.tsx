import React, { useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
// FIX: Switched from require to a standard ES module import for react-router-dom to fix module resolution error.
import { useNavigate, Link } from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';
import { ScaleIcon, SwatchIcon, KeyIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';
import JutsuCreator from '../components/JutsuCreator.tsx';
import JutsuCreatorIcon from '../components/icons/JutsuCreatorIcon.tsx';


const proThemes = [
    { id: 'theme-akatsuki', name: 'الأكاتسوكي', class: 'preview-akatsuki', description: 'انغمس في ظلام الأكاتسوكي مع هذا المظهر الأيقوني.' },
    { id: 'theme-war', name: 'حرب الشينوبي', class: 'preview-war', description: 'استشعر حرارة المعركة مع خلفية صحراوية مليئة بالغبار.' },
    { id: 'theme-mist', name: 'قرية الضباب', class: 'preview-mist', description: 'أحِط نفسك بالغموض مع أجواء الضباب والمطر الخفيف.' },
];


const FeaturesPage = () => {
  const { isPro, setBackgroundTheme } = useShinobiPro();
  // FIX: Property 'useNavigate' does not exist on type 'typeof import...'.
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPro) {
      navigate('/');
    }
  }, [isPro, navigate]);

  if (!isPro) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] w-full">
        <div className="features-hero w-full max-w-4xl text-center">
            <KeyIcon className="w-24 h-24 mx-auto text-amber-400" style={{filter: 'drop-shadow(0 0 15px #fbbF24)', transform: 'rotate(-45deg)'}} />
            <h1 className="font-cairo text-5xl md:text-6xl font-black text-transparent bg-clip-text 
                           bg-gradient-to-br from-amber-300 to-orange-500 mt-4 mb-2">
                مخطوطات النخبة
            </h1>
            <p className="font-tajawal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                لقد أثبتّ جدارتك. هذه الأدوات والتحليلات الحصرية تحت إمرتك الآن.
            </p>
        </div>

        <div className="w-full max-w-5xl space-y-8">
            
            {/* Exclusive Themes Section */}
            {/* FIX: Cast style object to React.CSSProperties to allow for CSS custom properties. */}
            <div className="feature-card-pro" style={{ '--hover-color': '#c084fc' } as React.CSSProperties}>
                <div className="feature-content text-right">
                    <div className="flex items-center justify-end gap-3 mb-4">
                        <h3 className="font-cairo text-3xl font-bold text-purple-300">
                           الخلفيات الحصرية
                        </h3>
                         <SwatchIcon className="w-8 h-8" />
                    </div>
                    <p className="text-gray-400 mb-6">غيّر أجواء الموسوعة بالكامل. اختر من بين هذه الخلفيات المصممة خصيصًا لأعضاء برو. انقر للتجربة.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {proThemes.map(theme => (
                            <button key={theme.id} onClick={() => setBackgroundTheme(theme.id)} className="text-right transition-transform hover:scale-105 p-2 rounded-lg hover:bg-white/5">
                                <div className={`feature-theme-preview ${theme.class}`}>
                                     <div className="pro-badge">PRO</div>
                                </div>
                                <h4 className="font-cairo font-bold text-lg">{theme.name}</h4>
                                <p className="text-sm text-gray-500">{theme.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

             {/* Jutsu Creator Section */}
            <div className="feature-card-pro" style={{ '--hover-color': '#3b82f6' } as React.CSSProperties}>
                <div className="feature-content text-right">
                    <div className="flex items-center justify-end gap-3 mb-4">
                        <h3 className="font-cairo text-3xl font-bold text-blue-400">
                           مختبر الجتسو
                        </h3>
                        <JutsuCreatorIcon className="w-8 h-8" />
                    </div>
                    <p className="text-gray-400 mb-6">أطلق العنان لإبداعك. صف فكرتك لتقنية نينجا، ودع الذكاء الاصطناعي يحولها إلى حقيقة بتفاصيلها الكاملة.</p>
                    <JutsuCreator />
                </div>
            </div>

            {/* Battle Comparison Card */}
            <Link to="/battle" state={{ from: "features" }}>
                {/* FIX: Cast style object to React.CSSProperties to allow for CSS custom properties. */}
                <div className="feature-card-pro" style={{ '--hover-color': '#22c55e' } as React.CSSProperties}>
                    <div className="feature-content text-right">
                        <div className="flex items-center justify-end gap-3">
                            <h3 className="font-cairo text-3xl font-bold text-green-400">
                                ساحة المعركة
                            </h3>
                            <ScaleIcon className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 mt-2">ضع أي شينوبي ضد آخر في مواجهة ملحمية. حلل إحصائياتهم، قدراتهم، واحسم الجدل حول من هو الأقوى.</p>
                    </div>
                </div>
            </Link>

            {/* Coming Soon Section */}
             <div className="feature-card-pro opacity-60 cursor-not-allowed" style={{ '--hover-color': '#8b5cf6' } as React.CSSProperties}>
                 <div className="feature-content text-right">
                    <div className="flex items-center justify-end gap-3">
                        <h3 className="font-cairo text-2xl font-bold text-indigo-400">
                            لوحة الأصوات
                        </h3>
                        <SpeakerWaveIcon className="w-7 h-7" />
                    </div>
                    <p className="text-gray-500 mt-2">قريباً: استمع للاقتباسات وأصوات التقنيات الأيقونية.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FeaturesPage;
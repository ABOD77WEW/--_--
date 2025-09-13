import React, { useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';
import ForbiddenScrollIcon from '../components/icons/ForbiddenScrollIcon.tsx';
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

  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] -mt-16">
        <div className="relative mb-6">
          <ForbiddenScrollIcon className="w-24 h-24 text-amber-400" style={{filter: 'drop-shadow(0 0 15px #fbbF24)'}} />
        </div>
        <h1 className="font-cairo text-5xl md:text-6xl font-black text-transparent bg-clip-text 
                           bg-gradient-to-br from-amber-300 to-orange-500 mb-4">
            مخطوطات المعرفة السرية
        </h1>
        <p className="font-tajawal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-2 mb-8">
            بصفتك عضو "برو"، هذه الأدوات والتحليلات الحصرية تحت إمرتك الآن.
        </p>
        <div className="w-full max-w-4xl space-y-6">
            <ReactRouterDOM.Link to="/battle" state={{ from: "features" }} className="block">
                <div className="bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/20">
                    <h3 className="font-cairo text-2xl font-bold text-green-400 mb-2 flex items-center justify-end gap-3">
                        مقارنة الشخصيات
                        <ScaleIcon className="w-7 h-7" />
                    </h3>
                    <p className="text-gray-400">خاصية حصرية تتيح لك وضع أي شينوبي ضد آخر في مواجهة ملحمية. حلل إحصائياتهم، قدراتهم، واحسم الجدل حول من هو الأقوى.</p>
                </div>
            </ReactRouterDOM.Link>
             <div className="bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition hover:border-red-400/50 hover:shadow-xl hover:shadow-red-500/20">
                <h3 className="font-cairo text-2xl font-bold text-red-400 mb-2 flex items-center justify-end gap-3">
                   مظهر الأكاتسوكي
                   <SwatchIcon className="w-7 h-7" />
                </h3>
                <p className="text-gray-400">اغمر نفسك في ظلام الأكاتسوكي. قم بتفعيل المظهر الحصري الذي يغير شكل الموسوعة بالكامل إلى طابع السحابة الحمراء الأيقوني.</p>
            </div>
             <div className="bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 opacity-70">
                <h3 className="font-cairo text-2xl font-bold text-blue-400 mb-2 flex items-center justify-end gap-3">
                   منشئ الجتسو <span className="text-xs bg-blue-900/80 text-blue-300 px-2 py-0.5 rounded-full">قريباً</span>
                   <PencilSquareIcon className="w-7 h-7" />
                </h3>
                <p className="text-gray-400">أطلق العنان لإبداعك. صمم تقنيات النينجا الخاصة بك، حدد طبيعة التشاكرا، الرتبة، والتأثيرات.</p>
            </div>
             <div className="bg-[#1A1A1A]/70 border border-[#2D3748] rounded-lg p-6 backdrop-blur-sm text-right transform transition hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/20 opacity-70">
                <h3 className="font-cairo text-2xl font-bold text-indigo-400 mb-2 flex items-center justify-end gap-3">
                   لوحة أصوات الشينوبي <span className="text-xs bg-indigo-900/80 text-indigo-300 px-2 py-0.5 rounded-full">قريباً</span>
                   <SpeakerWaveIcon className="w-7 h-7" />
                </h3>
                <p className="text-gray-400">استمع إلى أشهر صرخات المعارك، أصوات التقنيات، والاقتباسات الأيقونية من شخصياتك المفضلة.</p>
            </div>
        </div>
    </div>
  );
};

export default FeaturesPage;
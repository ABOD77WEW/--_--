import React, { useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';
import MangekyoProIcon from '../components/icons/MangekyoProIcon.tsx';

const ProPage = () => {
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
            <MangekyoProIcon className="w-28 h-28 text-purple-400" style={{filter: 'drop-shadow(0 0 20px #a855f7)'}} />
        </div>
        <h1 className="font-cairo text-5xl md:text-6xl font-black text-transparent bg-clip-text 
                           bg-gradient-to-br from-purple-400 to-red-500 mb-4">
            أهلاً بك أيها النخبة!
        </h1>
        <p className="font-tajawal text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mt-2 mb-8">
            لقد أثبتّ جدارتك. تم فتح المخطوطات السرية لك. استكشف القوة التي حصلت عليها.
        </p>
        <ReactRouterDOM.Link 
          to="/features"
          className="inline-block bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transform hover:-translate-y-1"
        >
            اكتشف الخصائص الحصرية
        </ReactRouterDOM.Link>
    </div>
  );
};

export default ProPage;
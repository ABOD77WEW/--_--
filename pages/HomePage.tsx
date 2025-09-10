import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] -mt-16">
        <div className="relative">
            <h1 
                className="font-cairo text-9xl md:text-[12rem] font-black text-transparent bg-clip-text 
                           bg-gradient-to-br from-gray-700 to-black 
                           dark:from-gray-300 dark:to-white"
                style={{ WebkitTextStroke: '2px var(--accent-dark)' }}
            >
                忍
            </h1>
            <h1 
                className="font-cairo text-9xl md:text-[12rem] font-black absolute inset-0 text-transparent bg-clip-text 
                           bg-gradient-to-br from-gray-700 to-black 
                           dark:from-gray-300 dark:to-white opacity-40 blur-xl"
            >
                忍
            </h1>
        </div>
      <h2 className="font-cairo text-4xl md:text-5xl font-bold mt-4 tracking-wider
        light:text-[var(--text-light)] dark:text-[var(--text-dark)]">
        موسوعة الشينوبي
      </h2>
      <p className="font-tajawal text-lg md:text-xl light:text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
        استكشف أعمق أسرار عالم النينجا. الشخصيات، العشائر، والتقنيات المحرمة، كلها في مكان واحد.
      </p>
    </div>
  );
};

export default HomePage;

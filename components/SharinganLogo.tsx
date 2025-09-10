import React, { useState } from 'react';

const SharinganLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
 
  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2500); // Duration of the kamui animation
  };

  return (
    <div
      className="w-24 h-24 cursor-pointer"
      onClick={handleClick}
      title="انقر لتفعيل الكاموي"
      aria-label="شعار الشارينغان"
    >
      <div
        className={`relative w-full h-full kamui-container ${isAnimating ? 'kamui-active' : ''}`}
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full sharingan-svg ${!isAnimating ? 'animate-continuous-rotate' : ''}`}
        >
          <defs>
              <radialGradient id="sharinganIris" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#ff4f4f"/>
                  <stop offset="40%" stopColor="#e00000"/>
                  <stop offset="75%" stopColor="#a00000"/>
                  <stop offset="95%" stopColor="#4d0000"/>
                  <stop offset="100%" stopColor="#200000"/>
              </radialGradient>
               <radialGradient id="irisHighlight" cx="35%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                  </feMerge>
              </filter>
               <filter id="tomoeGlow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="blur" />
                  <feOffset in="blur" dx="0.5" dy="0.5" result="offsetBlur" />
                  <feMerge>
                      <feMergeNode in="offsetBlur" />
                      <feMergeNode in="SourceGraphic" />
                  </feMerge>
              </filter>
          </defs>

          {/* Sclera - Eye white area, not really visible but good for structure */}
          <circle cx="50" cy="50" r="49" fill="#111" />

          {/* Iris background */}
          <circle cx="50" cy="50" r="45" fill="url(#sharinganIris)" filter="url(#glow)" />
          
          {/* Pupil with slight depth */}
          <circle cx="50" cy="50" r="20" fill="#000" />

          {/* Thin ring around pupil */}
          <circle cx="50" cy="50" r="22" stroke="#3b0202" strokeWidth="1.5" fill="none" strokeOpacity="0.9" />
          
          {/* Tomoe - Redesigned for a sharper, more dynamic look */}
          {[0, 120, 240].map(angle => (
              <g key={angle} transform={`rotate(${angle} 50 50)`} filter="url(#tomoeGlow)">
                  <path
                      d="M 50,28.5
                         C 61,33 63,44 57.5,47
                         A 10,10 0 1 1 50,28.5 Z"
                      fill="#0a0a0a"
                  />
              </g>
          ))}
          
          {/* Glossy highlight */}
          <circle cx="50" cy="50" r="45" fill="url(#irisHighlight)" />
          
          {/* Outer dark ring for depth */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeOpacity="0.5" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
};

export default SharinganLogo;
import React from 'react';

const MangekyoProIcon = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="godTierIris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="60%" stopColor="#a855f7" />
        <stop offset="85%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#2e1055" />
      </radialGradient>
      <radialGradient id="godTierGlow" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="transparent" />
        <stop offset="95%" stopColor="#e9d5ff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
       <filter id="godTierGlowFilter">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <clipPath id="godTierCircleClip">
        <circle cx="50" cy="50" r="46" />
      </clipPath>
    </defs>

    {/* Base and Glow */}
    <circle cx="50" cy="50" r="49" fill="#1e1b4b" />
    <circle cx="50" cy="50" r="46" fill="url(#godTierIris)" filter="url(#godTierGlowFilter)" />
    <circle cx="50" cy="50" r="48" fill="url(#godTierGlow)" />

    {/* Rinnegan Circles */}
    <g clipPath="url(#godTierCircleClip)" opacity="0.5">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#1e1b4b" strokeWidth="2" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#1e1b4b" strokeWidth="2" />
    </g>
    
    {/* Six Tomoe */}
    {[0, 60, 120, 180, 240, 300].map(angle => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M 50,29
             C 54,32 54,38 50,41
             A 6,6 0 1 1 50,29 Z"
          fill="#1e1b4b"
        />
      </g>
    ))}

    {/* Central Pupil */}
    <circle cx="50" cy="50" r="20" fill="#000" />

    {/* Mangekyo Blade Pattern */}
    <g fill="#111" transform="translate(50,50)">
       <path d="M 0,-20 
                C 10,0 10,0 20,0 
                L 12,-4 
                C 12,-10 12,-10 0,-20 Z" transform="rotate(0)"/>
       <path d="M 0,-20 
                C 10,0 10,0 20,0 
                L 12,-4 
                C 12,-10 12,-10 0,-20 Z" transform="rotate(120) scale(-1, 1)"/>
       <path d="M 0,-20 
                C 10,0 10,0 20,0 
                L 12,-4 
                C 12,-10 12,-10 0,-20 Z" transform="rotate(240)"/>
    </g>

    {/* Outer dark ring for depth */}
    <circle cx="50" cy="50" r="46" fill="none" stroke="black" strokeOpacity="0.8" strokeWidth="4" />
  </svg>
);

export default MangekyoProIcon;
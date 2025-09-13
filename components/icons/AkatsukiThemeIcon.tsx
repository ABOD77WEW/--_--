import React from 'react';

const AkatsukiThemeIcon = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="akatsukiThemeIconIris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff1f1f"/>
        <stop offset="100%" stopColor="#a00000"/>
      </radialGradient>
       <filter id="akatsukiIconGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#akatsukiThemeIconIris)" filter="url(#akatsukiIconGlow)" />
    <circle cx="50" cy="50" r="20" fill="#000" />
    <circle cx="50" cy="50" r="22" stroke="#3b0202" strokeWidth="1.5" fill="none" />
    {[0, 120, 240].map(angle => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M 50,28.5 
             C 62,34 65,45 58,48 
             A 10,10 0 1 1 50,28.5 Z"
          fill="#0a0a0a"
          stroke="#000"
          strokeWidth="1"
        />
      </g>
    ))}
  </svg>
);

export default AkatsukiThemeIcon;
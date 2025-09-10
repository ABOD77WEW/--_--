import React from 'react';

const SharinganIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="sharinganIconIris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff1f1f"/>
        <stop offset="100%" stopColor="#a00000"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="#111" />
    <circle cx="50" cy="50" r="45" fill="url(#sharinganIconIris)" />
    <circle cx="50" cy="50" r="20" fill="#000" />
    <circle cx="50" cy="50" r="22" stroke="#3b0202" strokeWidth="1.5" fill="none" />
    {[0, 120, 240].map(angle => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <path
          d="M 50,28.5 C 61,33 63,44 57.5,47 A 10,10 0 1 1 50,28.5 Z"
          fill="#0a0a0a"
        />
      </g>
    ))}
  </svg>
);

export default SharinganIcon;
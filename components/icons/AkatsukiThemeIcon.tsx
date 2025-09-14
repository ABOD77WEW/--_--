import React from 'react';

const AkatsukiThemeIcon = (props) => (
  <svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="Akatsuki Symbol">
    <defs>
      <filter id="akatsuki-lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 0.1 0 0 0  0 0 0.1 0 0  0 0 0 5 -1" result="dark_red_glow" />
        <feMerge>
          <feMergeNode in="dark_red_glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#akatsuki-lightning-glow)">
      {/* Main cloud shape */}
      <path
        d="M 86 30 C 82 14, 66 11, 57 17 C 48 9, 33 14, 29 24 C 20 20, 7 27, 6 38 C -5 47, 7 55, 16 51 C 18 57, 31 56, 37 51 C 43 57, 56 58, 62 52 C 75 56, 89 47, 86 30 Z"
        fill="#DC2626"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Internal white swirls */}
      <path
        d="M 45 24 C 54 28, 54 38, 49 41"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 26 42 C 33 43, 37 50, 31 51"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 65 35 C 73 38, 74 48, 67 49"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default AkatsukiThemeIcon;

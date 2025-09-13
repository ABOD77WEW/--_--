import React from 'react';

const AkatsukiSymbol = (props) => (
  <svg viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg" {...props} aria-label="Akatsuki Symbol">
    {/* 
      This SVG is a hand-drawn vector representation of the Akatsuki cloud symbol.
      It uses a single path for the main cloud shape with a fill and stroke,
      and three separate paths for the internal swirls. This ensures a crisp,
      scalable, and high-quality graphic.
    */}
    <g>
      {/* Main cloud shape: A single path with a red fill and a thick white outline */}
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

export default AkatsukiSymbol;


import React from 'react';

const SenjuSymbol = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round">
        <path d="M50 10 L 50 90" />
        <path d="M30 30 L 70 30" />
        <path d="M30 50 L 70 50" />
        <path d="M30 70 L 70 70" />
        <path d="M30 10 L 30 90" />
        <path d="M70 10 L 70 90" />
    </g>
  </svg>
);

export default SenjuSymbol;
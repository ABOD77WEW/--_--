

import React from 'react';

const OtoSymbol = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      <path d="M30 20 L 70 20 L 70 80 L 55 80 L 55 50 L 45 50 L 45 80 L 30 80 Z" />
      <circle cx="37.5" cy="15" r="5" />
      <circle cx="62.5" cy="15" r="5" />
    </g>
  </svg>
);

export default OtoSymbol;
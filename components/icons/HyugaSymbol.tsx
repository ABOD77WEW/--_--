

import React from 'react';

const HyugaSymbol = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="8" />
    <path d="M50 25 a 15 15 0 0 1 0 50" fill="currentColor"/>
  </svg>
);

export default HyugaSymbol;


import React from 'react';

const AnbuSymbol = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
      <path d="M 50,20 C 80,20 85,40 85,50 C 85,60 80,80 50,80 C 20,80 15,60 15,50 C 15,40 20,20 50,20 Z" />
      <path d="M 50,20 C 40,20 35,40 35,50 C 35,60 40,80 50,80" />
    </g>
  </svg>
);

export default AnbuSymbol;
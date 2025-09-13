

import React from 'react';

const KumoSymbol = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      <path d="M 30 20 C 10 20, 10 50, 30 50 H 70 C 90 50, 90 20, 70 20 C 60 5, 40 5, 30 20 Z" />
      <path d="M 40 60 C 20 60, 20 90, 40 90 H 60 C 80 90, 80 60, 60 60 C 55 50, 45 50, 40 60 Z" />
    </g>
  </svg>
);

export default KumoSymbol;
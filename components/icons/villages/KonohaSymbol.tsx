
import React from 'react';

const KonohaSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor">
      <path d="M50 5 C 20 25, 20 60, 50 95 C 80 60, 80 25, 50 5 Z M50 50 C 45 55, 45 75, 60 80 C 55 65, 65 55, 50 50 Z" />
    </g>
  </svg>
);

export default KonohaSymbol;

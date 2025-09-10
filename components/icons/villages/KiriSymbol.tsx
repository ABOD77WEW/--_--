
import React from 'react';

const KiriSymbol: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor" transform="translate(0, 5)">
      <path d="M20 40 L 35 40 L 50 20 L 65 40 L 80 40 L 65 60 L 80 80 L 65 80 L 50 100 L 35 80 L 20 80 L 35 60 Z" />
    </g>
  </svg>
);

export default KiriSymbol;

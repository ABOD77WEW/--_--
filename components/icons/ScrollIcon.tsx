import React from 'react';

const ScrollIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M8 21h12.5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H12"/>
    <path d="M8 21V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/>
    <path d="M8 21a2 2 0 0 0 2-2V5"/>
    <path d="M16 21a2 2 0 0 0-2-2V5"/>
  </svg>
);

export default ScrollIcon;
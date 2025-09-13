import React from 'react';

const SageWisdomIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <rect x="10" y="9" width="4" height="6" rx="1" fill="currentColor" />
    <path d="M10 11H14" stroke="#4a2e2e" strokeWidth="1" strokeLinecap="round"/>
    <path d="M10 13H14" stroke="#4a2e2e" strokeWidth="1" strokeLinecap="round"/>
    <path d="M3.5 8.5C5.5 5.5 12 3 12 3S18.5 5.5 20.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.5 15.5C5.5 18.5 12 21 12 21S18.5 18.5 20.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default SageWisdomIcon;
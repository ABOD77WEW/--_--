import React from 'react';

const ForbiddenScrollIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" />
    <path d="M15 3v18l4-2.5-4-2.5 4-2.5-4-2.5 4-2.5-4-2.5Z" />
    <circle cx="10" cy="12" r="1" strokeWidth="2" />
  </svg>
);

export default ForbiddenScrollIcon;

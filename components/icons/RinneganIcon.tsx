
import React from 'react';

const RinneganIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="48" fill="#a8a29e" />
    <circle cx="50" cy="50" r="45" fill="#d1d5db" stroke="#a3a3a3" strokeWidth="2" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="3" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="#8b5cf6" strokeWidth="3" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#8b5cf6" strokeWidth="3" />
    <circle cx="50" cy="50" r="5" fill="#8b5cf6" />
  </svg>
);

export default RinneganIcon;

import React from 'react';

const RinneSharinganIcon = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Rinnegan Circles */}
    {[...Array(8)].map((_, i) => (
      <circle 
        key={i} 
        cx="50" 
        cy="50" 
        r={45 - i * 5} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
      />
    ))}
    
    {/* Pupil */}
    <circle cx="50" cy="50" r="5" fill="currentColor" />

    {/* Tomoe */}
    {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(angle => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <path
                d="M 50,22.5
                   C 54,25 54,31 50,34
                   A 4,4 0 1 1 50,22.5 Z"
                fill="currentColor"
            />
        </g>
    ))}
  </svg>
);

export default RinneSharinganIcon;
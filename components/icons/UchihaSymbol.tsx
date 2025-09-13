import React from 'react';

const UchihaSymbol = (props) => (
  <svg viewBox="0 0 100 106" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Using a group for consistent stroke styling */}
    <g stroke="black" strokeWidth="2.5" strokeLinejoin="round" strokeMiterlimit="10">
      {/* Red Top Part (Fan) */}
      {/* This path creates the top arc and a curved bottom to match the image. */}
      <path
        fill="#ef4444"
        d="M 2.5,50 A 47.5,47.5 0 1 1 97.5,50 C 75,65 25,65 2.5,50 Z"
      />
      {/* White Bottom Part (Fan and Handle) */}
      {/* This path starts by drawing the bottom fan shape and handle, then closes with a curve at the top to separate it from the red part. */}
      <path
        fill="#ffffff"
        d="M 2.5,50 C 2.5,80 25,95 43,95 V 103.5 H 57 V 95 C 75,95 97.5,80 97.5,50 C 75,65 25,65 2.5,50 Z"
      />
    </g>
  </svg>
);

export default UchihaSymbol;
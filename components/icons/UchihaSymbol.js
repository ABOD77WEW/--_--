import React from 'react';

const UchihaSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 106", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'g',
      { stroke: "black", strokeWidth: "2.5", strokeLinejoin: "round", strokeMiterlimit: "10" },
      React.createElement('path', {
        fill: "#ef4444",
        d: "M 2.5,50 A 47.5,47.5 0 1 1 97.5,50 C 75,65 25,65 2.5,50 Z"
      }),
      React.createElement('path', {
        fill: "#ffffff",
        d: "M 2.5,50 C 2.5,80 25,95 43,95 V 103.5 H 57 V 95 C 75,95 97.5,80 97.5,50 C 75,65 25,65 2.5,50 Z"
      })
    )
  )
);

export default UchihaSymbol;

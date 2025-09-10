import React from 'react';

const SenjuSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'g',
      { fill: "none", stroke: "currentColor", strokeWidth: "7", strokeLinecap: "round" },
      React.createElement('path', { d: "M50 10 L 50 90" }),
      React.createElement('path', { d: "M30 30 L 70 30" }),
      React.createElement('path', { d: "M30 50 L 70 50" }),
      React.createElement('path', { d: "M30 70 L 70 70" }),
      React.createElement('path', { d: "M30 10 L 30 90" }),
      React.createElement('path', { d: "M70 10 L 70 90" })
    )
  )
);

export default SenjuSymbol;

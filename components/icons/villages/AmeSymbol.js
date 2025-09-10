import React from 'react';

const AmeSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'g',
      { fill: "none", stroke: "currentColor", strokeWidth: "8", strokeLinecap: "round" },
      React.createElement('path', { d: "M20 20 V 80" }),
      React.createElement('path', { d: "M40 20 V 80" }),
      React.createElement('path', { d: "M60 20 V 80" }),
      React.createElement('path', { d: "M80 20 V 80" })
    )
  )
);

export default AmeSymbol;

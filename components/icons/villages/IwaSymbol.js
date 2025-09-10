import React from 'react';

const IwaSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'g',
      { fill: "currentColor" },
      React.createElement('path', { d: "M20 20 H 80 V 40 H 60 V 60 H 40 V 40 H 20 Z" }),
      React.createElement('path', { d: "M30 70 H 70 V 90 H 30 Z" })
    )
  )
);

export default IwaSymbol;

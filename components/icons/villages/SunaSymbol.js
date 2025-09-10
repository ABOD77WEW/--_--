import React from 'react';

const SunaSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'g',
      { fill: "currentColor" },
      React.createElement('path', { d: "M50 10 C 25 20, 25 80, 50 90 C 75 80, 75 20, 50 10 Z M50 50 C 40 50, 40 30, 50 30 C 60 30, 60 50, 50 50 Z" })
    )
  )
);

export default SunaSymbol;

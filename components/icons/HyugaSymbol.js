import React from 'react';

const HyugaSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement('circle', { cx: "50", cy: "50", r: "40", fill: "none", stroke: "currentColor", strokeWidth: "8" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "25", fill: "none", stroke: "currentColor", strokeWidth: "8" }),
    React.createElement('path', { d: "M50 25 a 15 15 0 0 1 0 50", fill: "currentColor" })
  )
);

export default HyugaSymbol;

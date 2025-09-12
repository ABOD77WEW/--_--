import React from 'react';

const RinneSharinganIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    [...Array(8)].map((_, i) => (
      React.createElement('circle', { 
        key: i, 
        cx: "50", 
        cy: "50", 
        r: 45 - i * 5, 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "1.5" 
      })
    )),
    React.createElement('circle', { cx: "50", cy: "50", r: "5", fill: "currentColor" }),
    [0, 40, 80, 120, 160, 200, 240, 280, 320].map(angle => (
      React.createElement(
        'g',
        { key: angle, transform: `rotate(${angle} 50 50)` },
        React.createElement('path', {
          d: "M 50,22.5 C 54,25 54,31 50,34 A 4,4 0 1 1 50,22.5 Z",
          fill: "currentColor"
        })
      )
    ))
  )
);

export default RinneSharinganIcon;

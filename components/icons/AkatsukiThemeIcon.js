import React from 'react';

const AkatsukiThemeIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 106", xmlns: "http://www.w3.org/2000/svg", ...props, "aria-label": "Uchiha Symbol" },
    React.createElement('defs', null,
      React.createElement('filter', { id: "akatsuki-base-glow", x:"-50%", y:"-50%", width:"200%", height:"200%"},
        React.createElement('feGaussianBlur', { in: "SourceAlpha", stdDeviation: "2", result: "blur" }),
        React.createElement('feColorMatrix', {
          in: "blur",
          mode: "matrix",
          values: "1 0 0 0 0  0 0.1 0 0 0  0 0 0.1 0 0  0 0 0 2 -0.5",
          result: "dark_red_glow"
        }),
        React.createElement('feMerge', null,
          React.createElement('feMergeNode', { in: "dark_red_glow" }),
          React.createElement('feMergeNode', { in: "SourceGraphic" })
        )
      )
    ),
    React.createElement(
      'g',
      { filter: "url(#akatsuki-base-glow)" },
      React.createElement(
        'g',
        { stroke: "#FFFFFF", strokeWidth: "2.5", strokeLinejoin: "round", strokeMiterlimit: "10" },
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
  )
);

export default AkatsukiThemeIcon;
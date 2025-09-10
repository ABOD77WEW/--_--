import React from 'react';

const AkatsukiThemeIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'defs',
      null,
      React.createElement(
        'radialGradient',
        { id: "akatsukiThemeIconIris", cx: "50%", cy: "50%", r: "50%" },
        React.createElement('stop', { offset: "0%", stopColor: "#ff1f1f" }),
        React.createElement('stop', { offset: "100%", stopColor: "#a00000" })
      ),
      React.createElement(
        'filter',
        { id: "akatsukiIconGlow" },
        React.createElement('feGaussianBlur', { stdDeviation: "2", result: "coloredBlur" }),
        React.createElement(
          'feMerge',
          null,
          React.createElement('feMergeNode', { in: "coloredBlur" }),
          React.createElement('feMergeNode', { in: "SourceGraphic" })
        )
      )
    ),
    React.createElement('circle', { cx: "50", cy: "50", r: "48", fill: "url(#akatsukiThemeIconIris)", filter: "url(#akatsukiIconGlow)" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "20", fill: "#000" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "22", stroke: "#3b0202", strokeWidth: "1.5", fill: "none" }),
    [0, 120, 240].map(angle => (
      React.createElement(
        'g',
        { key: angle, transform: `rotate(${angle} 50 50)` },
        React.createElement('path', {
          d: "M 50,28.5 C 62,34 65,45 58,48 A 10,10 0 1 1 50,28.5 Z",
          fill: "#0a0a0a",
          stroke: "#000",
          strokeWidth: "1"
        })
      )
    ))
  )
);

export default AkatsukiThemeIcon;

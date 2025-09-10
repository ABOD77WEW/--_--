import React from 'react';

const MangekyoProIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'defs',
      null,
      React.createElement(
        'radialGradient',
        { id: "godTierIris", cx: "50%", cy: "50%", r: "50%" },
        React.createElement('stop', { offset: "0%", stopColor: "#c084fc" }),
        React.createElement('stop', { offset: "60%", stopColor: "#a855f7" }),
        React.createElement('stop', { offset: "85%", stopColor: "#7e22ce" }),
        React.createElement('stop', { offset: "100%", stopColor: "#2e1055" })
      ),
      React.createElement(
        'radialGradient',
        { id: "godTierGlow", cx: "50%", cy: "50%", r: "50%" },
        React.createElement('stop', { offset: "70%", stopColor: "transparent" }),
        React.createElement('stop', { offset: "95%", stopColor: "#e9d5ff", stopOpacity: "0.3" }),
        React.createElement('stop', { offset: "100%", stopColor: "transparent" })
      ),
      React.createElement(
        'filter',
        { id: "godTierGlowFilter" },
        React.createElement('feGaussianBlur', { stdDeviation: "2.5", result: "coloredBlur" }),
        React.createElement(
          'feMerge',
          null,
          React.createElement('feMergeNode', { in: "coloredBlur" }),
          React.createElement('feMergeNode', { in: "SourceGraphic" })
        )
      ),
      React.createElement(
        'clipPath',
        { id: "godTierCircleClip" },
        React.createElement('circle', { cx: "50", cy: "50", r: "46" })
      )
    ),
    React.createElement('circle', { cx: "50", cy: "50", r: "49", fill: "#1e1b4b" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "46", fill: "url(#godTierIris)", filter: "url(#godTierGlowFilter)" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "48", fill: "url(#godTierGlow)" }),
    React.createElement(
      'g',
      { clipPath: "url(#godTierCircleClip)", opacity: "0.5" },
      React.createElement('circle', { cx: "50", cy: "50", r: "42", fill: "none", stroke: "#1e1b4b", strokeWidth: "2" }),
      React.createElement('circle', { cx: "50", cy: "50", r: "34", fill: "none", stroke: "#1e1b4b", strokeWidth: "2" }),
      React.createElement('circle', { cx: "50", cy: "50", r: "26", fill: "none", stroke: "#1e1b4b", strokeWidth: "2" })
    ),
    [0, 60, 120, 180, 240, 300].map(angle => (
      React.createElement(
        'g',
        { key: angle, transform: `rotate(${angle} 50 50)` },
        React.createElement('path', {
          d: "M 50,29 C 54,32 54,38 50,41 A 6,6 0 1 1 50,29 Z",
          fill: "#1e1b4b"
        })
      )
    )),
    React.createElement('circle', { cx: "50", cy: "50", r: "20", fill: "#000" }),
    React.createElement(
      'g',
      { fill: "#111", transform: "translate(50,50)" },
      React.createElement('path', { d: "M 0,-20 C 10,0 10,0 20,0 L 12,-4 C 12,-10 12,-10 0,-20 Z", transform: "rotate(0)" }),
      React.createElement('path', { d: "M 0,-20 C 10,0 10,0 20,0 L 12,-4 C 12,-10 12,-10 0,-20 Z", transform: "rotate(120) scale(-1, 1)" }),
      React.createElement('path', { d: "M 0,-20 C 10,0 10,0 20,0 L 12,-4 C 12,-10 12,-10 0,-20 Z", transform: "rotate(240)" })
    ),
    React.createElement('circle', { cx: "50", cy: "50", r: "46", fill: "none", stroke: "black", strokeOpacity: "0.8", strokeWidth: "4" })
  )
);

export default MangekyoProIcon;

import React from 'react';

const MangekyoIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement(
      'defs',
      null,
      React.createElement(
        'radialGradient',
        { id: "mangekyoIconIris", cx: "50%", cy: "50%", r: "50%" },
        React.createElement('stop', { offset: "0%", stopColor: "#ff1f1f" }),
        React.createElement('stop', { offset: "100%", stopColor: "#a00000" })
      ),
      React.createElement(
        'filter',
        { id: "mangekyoGlow" },
        React.createElement('feDropShadow', { dx: "0", dy: "0", stdDeviation: "1.5", floodColor: "#000000", floodOpacity: "0.5" })
      )
    ),
    React.createElement('circle', { cx: "50", cy: "50", r: "48", fill: "#111" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "45", fill: "url(#mangekyoIconIris)" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "12", fill: "#000" }),
    React.createElement(
      'g',
      { fill: "#0a0a0a", filter: "url(#mangekyoGlow)" },
      React.createElement('path', { d: "M50,8 Q60,35 78,42 C65,50 65,50 50,92 C35,50 35,50 22,42 C40,35 40,35 50,8 Z" })
    ),
    React.createElement('circle', { cx: "50", cy: "50", r: "45", fill: "none", stroke: "black", strokeOpacity: "0.4", strokeWidth: "2" })
  )
);

export default MangekyoIcon;

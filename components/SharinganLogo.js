import React, { useState } from 'react';

const SharinganLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
 
  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 2500); // Duration of the kamui animation
  };

  const path = (attrs) => React.createElement('path', attrs);
  const g = (attrs, children) => React.createElement('g', attrs, children);
  const circle = (attrs) => React.createElement('circle', attrs);
  const stop = (attrs) => React.createElement('stop', attrs);

  return React.createElement(
    'div',
    {
      className: "w-24 h-24 cursor-pointer",
      onClick: handleClick,
      title: "انقر لتفعيل الكاموي",
      "aria-label": "شعار الشارينغان"
    },
    React.createElement(
      'div',
      { className: `relative w-full h-full kamui-container ${isAnimating ? 'kamui-active' : ''}` },
      React.createElement(
        'svg',
        {
          viewBox: "0 0 100 100",
          xmlns: "http://www.w3.org/2000/svg",
          className: `w-full h-full sharingan-svg ${!isAnimating ? 'animate-continuous-rotate' : ''}`
        },
        React.createElement(
          'defs',
          null,
          React.createElement(
            'radialGradient',
            { id: "sharinganIris", cx: "50%", cy: "50%", r: "50%", fx: "50%", fy: "50%" },
            stop({ offset: "0%", stopColor: "#ff4f4f" }),
            stop({ offset: "40%", stopColor: "#e00000" }),
            stop({ offset: "75%", stopColor: "#a00000" }),
            stop({ offset: "95%", stopColor: "#4d0000" }),
            stop({ offset: "100%", stopColor: "#200000" })
          ),
          React.createElement(
            'radialGradient',
            { id: "irisHighlight", cx: "35%", cy: "35%", r: "60%" },
            stop({ offset: "0%", stopColor: "white", stopOpacity: "0.28" }),
            stop({ offset: "100%", stopColor: "white", stopOpacity: "0" })
          ),
          React.createElement(
            'filter',
            { id: "glow" },
            React.createElement('feGaussianBlur', { stdDeviation: "1.5", result: "coloredBlur" }),
            React.createElement(
              'feMerge',
              null,
              React.createElement('feMergeNode', { in: "coloredBlur" }),
              React.createElement('feMergeNode', { in: "SourceGraphic" })
            )
          ),
          React.createElement(
            'filter',
            { id: "tomoeGlow" },
            React.createElement('feGaussianBlur', { in: "SourceAlpha", stdDeviation: "0.5", result: "blur" }),
            React.createElement('feOffset', { in: "blur", dx: "0.5", dy: "0.5", result: "offsetBlur" }),
            React.createElement(
              'feMerge',
              null,
              React.createElement('feMergeNode', { in: "offsetBlur" }),
              React.createElement('feMergeNode', { in: "SourceGraphic" })
            )
          )
        ),
        circle({ cx: "50", cy: "50", r: "49", fill: "#111" }),
        circle({ cx: "50", cy: "50", r: "45", fill: "url(#sharinganIris)", filter: "url(#glow)" }),
        circle({ cx: "50", cy: "50", r: "20", fill: "#000" }),
        circle({ cx: "50", cy: "50", r: "22", stroke: "#3b0202", strokeWidth: "1.5", fill: "none", strokeOpacity: "0.9" }),
        [0, 120, 240].map(angle =>
          g(
            { key: angle, transform: `rotate(${angle} 50 50)`, filter: "url(#tomoeGlow)" },
            path({
              d: "M 50,28.5 C 61,33 63,44 57.5,47 A 10,10 0 1 1 50,28.5 Z",
              fill: "#0a0a0a"
            })
          )
        ),
        circle({ cx: "50", cy: "50", r: "45", fill: "url(#irisHighlight)" }),
        circle({ cx: "50", cy: "50", r: "45", fill: "none", stroke: "black", strokeOpacity: "0.5", strokeWidth: "2.5" })
      )
    )
  );
};

export default SharinganLogo;

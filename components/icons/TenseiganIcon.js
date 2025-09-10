import React from 'react';

const TenseiganIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement('circle', { cx: "50", cy: "50", r: "48", fill: "#60a5fa" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "45", fill: "#93c5fd", stroke: "#bfdbfe", strokeWidth: "2" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "10", fill: "white" }),
    React.createElement(
      'g',
      { stroke: "white", strokeWidth: "3" },
      [...Array(12)].map((_, i) => (
        React.createElement('path', {
          key: i,
          d: `M50 50 L${50 + 40 * Math.cos(i * 30 * Math.PI / 180)} ${50 + 40 * Math.sin(i * 30 * Math.PI / 180)}`,
          opacity: "0.5"
        })
      ))
    )
  )
);

export default TenseiganIcon;

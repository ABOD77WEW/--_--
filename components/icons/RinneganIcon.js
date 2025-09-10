import React from 'react';

const RinneganIcon = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 100 100", xmlns: "http://www.w3.org/2000/svg", ...props },
    React.createElement('circle', { cx: "50", cy: "50", r: "48", fill: "#a8a29e" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "45", fill: "#d1d5db", stroke: "#a3a3a3", strokeWidth: "2" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "35", fill: "none", stroke: "#8b5cf6", strokeWidth: "3" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "25", fill: "none", stroke: "#8b5cf6", strokeWidth: "3" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "15", fill: "none", stroke: "#8b5cf6", strokeWidth: "3" }),
    React.createElement('circle', { cx: "50", cy: "50", r: "5", fill: "#8b5cf6" })
  )
);

export default RinneganIcon;

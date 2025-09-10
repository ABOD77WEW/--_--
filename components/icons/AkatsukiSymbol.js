import React from 'react';

const AkatsukiSymbol = (props) => (
  React.createElement(
    'svg',
    { viewBox: "0 0 90 60", xmlns: "http://www.w3.org/2000/svg", ...props, "aria-label": "Akatsuki Symbol" },
    React.createElement(
      'g',
      null,
      React.createElement('path', {
        d: "M 86 30 C 82 14, 66 11, 57 17 C 48 9, 33 14, 29 24 C 20 20, 7 27, 6 38 C -5 47, 7 55, 16 51 C 18 57, 31 56, 37 51 C 43 57, 56 58, 62 52 C 75 56, 89 47, 86 30 Z",
        fill: "#DC2626",
        stroke: "#FFFFFF",
        strokeWidth: "5",
        strokeLinejoin: "round"
      }),
      React.createElement('path', {
        d: "M 45 24 C 54 28, 54 38, 49 41",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: "3.5",
        strokeLinecap: "round"
      }),
      React.createElement('path', {
        d: "M 26 42 C 33 43, 37 50, 31 51",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: "3.5",
        strokeLinecap: "round"
      }),
      React.createElement('path', {
        d: "M 65 35 C 73 38, 74 48, 67 49",
        fill: "none",
        stroke: "#FFFFFF",
        strokeWidth: "3.5",
        strokeLinecap: "round"
      })
    )
  )
);

export default AkatsukiSymbol;

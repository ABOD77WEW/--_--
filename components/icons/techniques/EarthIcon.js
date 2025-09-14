import React from 'react';

const EarthIcon = (props) => (
  React.createElement('svg', {viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", ...props},
    React.createElement('path', {d:"M21.5 12H2.5"}),
    React.createElement('path', {d:"M16 17.5 12 22l-4-4.5"}),
    React.createElement('path', {d:"M8 6.5 12 2l4 4.5"})
  )
);

export default EarthIcon;

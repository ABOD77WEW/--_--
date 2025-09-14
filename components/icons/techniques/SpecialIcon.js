import React from 'react';

const SpecialIcon = (props) => (
  React.createElement('svg', {viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round", strokeLinejoin:"round", ...props},
    React.createElement('path', {d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"}),
    React.createElement('path', {d:"m14.5 14.5-5-5"}),
    React.createElement('path', {d:"m9.5 14.5 5-5"})
  )
);

export default SpecialIcon;

import React from 'react';

const JutsuCreatorIcon = (props) => (
    React.createElement('svg', { 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "1.5", 
        strokeLinecap: "round", 
        strokeLinejoin: "round", 
        ...props 
    },
        React.createElement('path', { d: "M15 3H6a2 2 0 00-2 2v14a2 2 0 002 2h9" }),
        React.createElement('path', { d: "M15 3v18l4-2.5-4-2.5 4-2.5-4-2.5 4-2.5-4-2.5Z" }),
        React.createElement('path', { d: "M10.5 10.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z", fill: "currentColor" }),
        React.createElement('path', { d: "M6 12a4 4 0 014-4h.5a4 4 0 000 8H10a4 4 0 01-4-4z" })
    )
);

export default JutsuCreatorIcon;

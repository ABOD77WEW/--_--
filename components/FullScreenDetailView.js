import React, { useState, useEffect } from 'react';

const FullScreenDetailView = ({ show, onClose, children }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) {
      setRender(true);
      document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [show]);
  
  const onAnimationEnd = () => {
    if (!show) {
        setRender(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!render) {
    return null;
  }

  return React.createElement(
    'div',
    {
      className: `fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`,
      onAnimationEnd: onAnimationEnd,
      role: "dialog",
      "aria-modal": "true"
    },
    React.createElement('div', { className: "absolute inset-0 bg-black/80 backdrop-blur-sm", onClick: onClose }),
    React.createElement(
        'button',
        {
          onClick: onClose,
          className: "detail-exit-button",
          "aria-label": "إغلاق"
        },
        React.createElement(
          'svg',
          { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 },
          React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" })
        )
      ),
    React.createElement(
      'div',
      {
        className: `absolute inset-0 w-full h-full bg-[var(--bg-dark)] shadow-2xl p-6 md:p-8 transform transition-all duration-300 ease-in-out overflow-y-auto ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`,
        onClick: (e) => e.stopPropagation(),
        style: { direction: 'rtl' }
      },
      children
    )
  );
};

export default FullScreenDetailView;
import React, { useState, useEffect } from 'react';

interface FullScreenDetailViewProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenDetailView: React.FC<FullScreenDetailViewProps> = ({ show, onClose, children }) => {
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
    const handleKeyDown = (event: KeyboardEvent) => {
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

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onAnimationEnd={onAnimationEnd}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute inset-0 w-full h-full bg-[var(--bg-dark)] shadow-2xl p-6 md:p-8 transform transition-transform duration-500 ease-in-out overflow-y-auto ${show ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
        style={{ direction: 'rtl' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-red-500 dark:hover:text-red-400 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default FullScreenDetailView;
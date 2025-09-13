// FIX: Rewrote as a TypeScript module with JSX and strong types for context, resolving module errors.
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShinobiProContext = createContext(undefined);

// FIX: Corrected the component to return a ReactNode, as required by React.FC. The original implementation had an empty function body.
export const ShinobiProProvider = ({ children }) => {
  const [isPro, setIsPro] = useState(() => {
    try {
      const item = window.localStorage.getItem('shinobi-pro-status');
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  const [isAkatsukiTheme, setIsAkatsukiTheme] = useState(() => {
    try {
      const item = window.localStorage.getItem('shinobi-akatsuki-theme');
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });
  
  const [isActivating, setIsActivating] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [detailViewContent, setDetailViewContent] = useState({ item: null, category: null });

  useEffect(() => {
    window.localStorage.setItem('shinobi-pro-status', JSON.stringify(isPro));
  }, [isPro]);

  useEffect(() => {
    if(isPro) {
        window.localStorage.setItem('shinobi-akatsuki-theme', JSON.stringify(isAkatsukiTheme));
    }
  }, [isAkatsukiTheme, isPro]);

  const activatePro = () => {
    setIsPro(true);
  };

  const toggleAkatsukiTheme = () => {
    if(isPro) {
      setIsAkatsukiTheme(prev => !prev);
    }
  };
  
  const openDetailView = (item, category) => {
    setDetailViewContent({ item, category });
    setIsDetailViewOpen(true);
  };

  const closeDetailView = () => {
    setIsDetailViewOpen(false);
  };
  
  // FIX: Converted JSX to React.createElement to be valid in a .ts file, resolving parsing errors and fulfilling the component's contract to return a ReactNode.
  return React.createElement(
    ShinobiProContext.Provider,
    { value: { isPro, activatePro, isActivating, setIsActivating, isAkatsukiTheme, toggleAkatsukiTheme, isDetailViewOpen, detailViewContent, openDetailView, closeDetailView } },
    children
  );
};

export const useShinobiPro = () => {
  const context = useContext(ShinobiProContext);
  if (context === undefined) {
    throw new Error('useShinobiPro must be used within a ShinobiProProvider');
  }
  return context;
};
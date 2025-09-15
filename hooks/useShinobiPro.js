import React, { createContext, useContext, useState, useEffect } from 'react';

const ShinobiProContext = createContext(undefined);

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

  const [isActivating, setIsActivating] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [detailViewContent, setDetailViewContent] = useState({ item: null, category: null });
  const [backgroundTheme, setBackgroundTheme] = useState(() => {
    try {
      const item = window.localStorage.getItem('shinobi-background-theme');
      if (item) {
        const parsedItem = JSON.parse(item);
        if(parsedItem === 'theme-akatsuki' && !JSON.parse(window.localStorage.getItem('shinobi-pro-status') || 'false')) {
             return 'theme-default';
        }
        return parsedItem;
      }
      return 'theme-default';
    } catch (error) {
      console.error(error);
      return 'theme-default';
    }
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('shinobi-pro-status', JSON.stringify(isPro));
    if (!isPro) {
        const proThemes = ['theme-akatsuki', 'theme-war', 'theme-mist'];
        if (proThemes.includes(backgroundTheme)) {
            setBackgroundTheme('theme-default');
        }
    }
  }, [isPro, backgroundTheme]);


  useEffect(() => {
    window.localStorage.setItem('shinobi-background-theme', JSON.stringify(backgroundTheme));
  }, [backgroundTheme]);

  const activatePro = () => {
    setIsPro(true);
  };

  const openDetailView = (item, category) => {
    setDetailViewContent({ item, category });
    setIsDetailViewOpen(true);
  };

  const closeDetailView = () => {
    setIsDetailViewOpen(false);
  };

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return React.createElement(
    ShinobiProContext.Provider,
    { value: { 
        isPro, activatePro, isActivating, setIsActivating, 
        isDetailViewOpen, detailViewContent, openDetailView, closeDetailView,
        backgroundTheme, setBackgroundTheme,
        isSettingsOpen, openSettings, closeSettings
      } 
    },
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
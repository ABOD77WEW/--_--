import React, { createContext, useContext, useState, useEffect } from 'react';

interface ShinobiProContextType {
  isPro: boolean;
  activatePro: () => void;
  isActivating: boolean;
  setIsActivating: (activating: boolean) => void;
  isAkatsukiTheme: boolean;
  toggleAkatsukiTheme: () => void;
}

const ShinobiProContext = createContext<ShinobiProContextType | undefined>(undefined);

export const ShinobiProProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      const item = window.localStorage.getItem('shinobi-pro-status');
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  const [isAkatsukiTheme, setIsAkatsukiTheme] = useState<boolean>(() => {
    try {
      const item = window.localStorage.getItem('shinobi-akatsuki-theme');
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  const [isActivating, setIsActivating] = useState<boolean>(false);

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


  return React.createElement(
    ShinobiProContext.Provider,
    { value: { isPro, activatePro, isActivating, setIsActivating, isAkatsukiTheme, toggleAkatsukiTheme } },
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



import React, { useState, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import ArcsPage from './pages/ArcsPage';
import EyesPage from './pages/EyesPage';
import ClansPage from './pages/ClansPage';
import FavoritesPage from './pages/FavoritesPage';
import ProPage from './pages/ProPage';
import FeaturesPage from './pages/FeaturesPage';
import BattlePage from './pages/BattlePage';
import TimelinePage from './pages/TimelinePage';
import ShinobiPro from './components/ShinobiPro';
import { FavoritesProvider } from './hooks/useFavorites';
import { useShinobiPro, ShinobiProProvider } from './hooks/useShinobiPro';


const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = ReactRouterDOM.useLocation();
  const [animationClass, setAnimationClass] = useState('opacity-0');

  useEffect(() => {
    setAnimationClass('opacity-0');
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100');
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <main className={`transition-opacity duration-500 ease-in-out ${animationClass}`}>
      {children}
    </main>
  );
};


const ThemedAppLayout = () => {
  const { isAkatsukiTheme } = useShinobiPro();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');

    if (isAkatsukiTheme) {
      document.body.classList.add('theme-akatsuki');
    } else {
      document.body.classList.remove('theme-akatsuki');
    }

    // Cleanup function to remove class on component unmount
    return () => {
      document.body.classList.remove('theme-akatsuki');
    };
  }, [isAkatsukiTheme]);

  return (
      <ReactRouterDOM.HashRouter>
          <ShinobiPro />
          <div className="flex flex-row-reverse">
            <Navigation />
            
            <div className="flex-1 md:mr-64 lg:mr-72">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12">
                <ReactRouterDOM.Routes>
                  <ReactRouterDOM.Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/characters" element={<PageWrapper><CharactersPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/arcs" element={<PageWrapper><ArcsPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/eyes" element={<PageWrapper><EyesPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/clans" element={<PageWrapper><ClansPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/favorites" element={<PageWrapper><FavoritesPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/pro" element={<PageWrapper><ProPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/features" element={<PageWrapper><FeaturesPage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/battle" element={<PageWrapper><BattlePage /></PageWrapper>} />
                  <ReactRouterDOM.Route path="/timeline" element={<PageWrapper><TimelinePage /></PageWrapper>} />
                </ReactRouterDOM.Routes>
              </div>
            </div>
          </div>
        </ReactRouterDOM.HashRouter>
  );
};


function App() {
  return (
    <ShinobiProProvider>
      <FavoritesProvider>
        <ThemedAppLayout />
      </FavoritesProvider>
    </ShinobiProProvider>
  );
}

export default App;
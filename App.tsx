// FIX: Rewrote as a TypeScript module with JSX and strong types, and added ShinobiProProvider.
import React, { useState, useEffect, ReactNode } from 'react';
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
import Footer from './components/Footer';
import FullScreenDetailView from './components/FullScreenDetailView';

import { FavoritesProvider } from './hooks/useFavorites';
import { useShinobiPro, ShinobiProProvider } from './hooks/useShinobiPro';

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = ReactRouterDOM.useLocation();
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-5');

  useEffect(() => {
    // On location change, we want to reset the animation state for the new page
    setAnimationClass('opacity-0 translate-y-5');
    const timer = setTimeout(() => {
      // Then trigger the fade-in and slide-up animation
      setAnimationClass('opacity-100 translate-y-0');
    }, 50); // A small delay is needed to ensure the browser registers the state change and applies the transition
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <main className={`transition-all duration-500 ease-out ${animationClass}`}>
      {children}
    </main>
  );
};


const ThemedAppLayout: React.FC = () => {
    const { isAkatsukiTheme } = useShinobiPro();
    const location = ReactRouterDOM.useLocation();
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.add('dark');
        root.classList.remove('light');

        if(isAkatsukiTheme) {
            document.body.classList.add('theme-akatsuki');
        } else {
            document.body.classList.remove('theme-akatsuki');
        }

        return () => {
            document.body.classList.remove('theme-akatsuki');
        }
    }, [isAkatsukiTheme]);

    if(location.pathname === '/timeline') {
        return <TimelinePage />;
    }

    return (
        <>
            <FullScreenDetailView />
            <ShinobiPro />
            <div className="flex flex-row-reverse">
                <Navigation />
                <div className={`flex-1 transition-all duration-300 md:mr-64 lg:mr-72`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12 min-h-screen">
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
                        </ReactRouterDOM.Routes>
                    </div>
                     <Footer />
                </div>
            </div>
        </>
    );
}

const App: React.FC = () => {
  return (
    <ShinobiProProvider>
        <FavoritesProvider>
            <ReactRouterDOM.HashRouter>
              <ThemedAppLayout />
            </ReactRouterDOM.HashRouter>
        </FavoritesProvider>
    </ShinobiProProvider>
  );
}

export default App;
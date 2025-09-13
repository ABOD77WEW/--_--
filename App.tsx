// FIX: Rewrote as a TypeScript module with JSX and strong types, and added ShinobiProProvider.
import React, { useState, useEffect } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';

import Navigation from './components/Navigation.tsx';
import HomePage from './pages/HomePage.tsx';
import CharactersPage from './pages/CharactersPage.tsx';
import ArcsPage from './pages/ArcsPage.tsx';
import EyesPage from './pages/EyesPage.tsx';
import ClansPage from './pages/ClansPage.tsx';
import FavoritesPage from './pages/FavoritesPage.tsx';
import ProPage from './pages/ProPage.tsx';
import FeaturesPage from './pages/FeaturesPage.tsx';
import BattlePage from './pages/BattlePage.tsx';
import TimelinePage from './pages/TimelinePage.tsx';
import ShinobiPro from './components/ShinobiPro.tsx';
import Footer from './components/Footer.tsx';
import FullScreenDetailView from './components/FullScreenDetailView.tsx';

import { FavoritesProvider } from './hooks/useFavorites.ts';
import { useShinobiPro, ShinobiProProvider } from './hooks/useShinobiPro.ts';

const PageWrapper = ({ children }) => {
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


const ThemedAppLayout = () => {
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

const App = () => {
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
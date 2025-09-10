import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Navigation from './components/Navigation.js';
import HomePage from './pages/HomePage.js';
import CharactersPage from './pages/CharactersPage.js';
import ArcsPage from './pages/ArcsPage.js';
import EyesPage from './pages/EyesPage.js';
import ClansPage from './pages/ClansPage.js';
import FavoritesPage from './pages/FavoritesPage.js';
import ProPage from './pages/ProPage.js';
import FeaturesPage from './pages/FeaturesPage.js';
import BattlePage from './pages/BattlePage.js';
import TimelinePage from './pages/TimelinePage.js';
import ShinobiPro from './components/ShinobiPro.js';
import { FavoritesProvider } from './hooks/useFavorites.js';
import { useShinobiPro, ShinobiProProvider } from './hooks/useShinobiPro.js';

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

  return React.createElement(
    'main',
    { className: `transition-all duration-500 ease-out ${animationClass}` },
    children
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

    return () => {
      document.body.classList.remove('theme-akatsuki');
    };
  }, [isAkatsukiTheme]);

  return React.createElement(
    ReactRouterDOM.HashRouter,
    null,
    React.createElement(ShinobiPro),
    React.createElement(
      'div',
      { className: 'flex flex-row-reverse' },
      React.createElement(Navigation),
      React.createElement(
        'div',
        { className: 'flex-1 md:mr-64 lg:mr-72' },
        React.createElement(
          'div',
          { className: 'container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24 md:pb-12' },
          React.createElement(
            ReactRouterDOM.Routes,
            null,
            React.createElement(ReactRouterDOM.Route, { path: '/', element: React.createElement(PageWrapper, null, React.createElement(HomePage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/characters', element: React.createElement(PageWrapper, null, React.createElement(CharactersPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/arcs', element: React.createElement(PageWrapper, null, React.createElement(ArcsPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/eyes', element: React.createElement(PageWrapper, null, React.createElement(EyesPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/clans', element: React.createElement(PageWrapper, null, React.createElement(ClansPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/favorites', element: React.createElement(PageWrapper, null, React.createElement(FavoritesPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/pro', element: React.createElement(PageWrapper, null, React.createElement(ProPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/features', element: React.createElement(PageWrapper, null, React.createElement(FeaturesPage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/battle', element: React.createElement(PageWrapper, null, React.createElement(BattlePage)) }),
            React.createElement(ReactRouterDOM.Route, { path: '/timeline', element: React.createElement(PageWrapper, null, React.createElement(TimelinePage)) })
          )
        )
      )
    )
  );
};

function App() {
  return React.createElement(
    ShinobiProProvider,
    null,
    React.createElement(
      FavoritesProvider,
      null,
      React.createElement(ThemedAppLayout)
    )
  );
}

export default App;
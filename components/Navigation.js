import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import SharinganLogo from './SharinganLogo.js';
import { HomeIcon, UserGroupIcon, FilmIcon, EyeIcon, FlagIcon, StarIcon } from '@heroicons/react/24/solid';
import ForbiddenScrollIcon from './icons/ForbiddenScrollIcon.js';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

const baseNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props) => React.createElement(HomeIcon, props) },
  { path: '/characters', name: 'الشخصيات', icon: (props) => React.createElement(UserGroupIcon, props) },
  { path: '/arcs', name: 'الآركات', icon: (props) => React.createElement(FilmIcon, props) },
  { path: '/eyes', name: 'العيون', icon: (props) => React.createElement(EyeIcon, props) },
  { path: '/clans', name: 'العشائر', icon: (props) => React.createElement(FlagIcon, props) },
  { path: '/favorites', name: 'المفضلة', icon: (props) => React.createElement(StarIcon, props) },
];

const proNavLinks = [
    { path: '/features', name: 'الخصائص', icon: (props) => React.createElement(ForbiddenScrollIcon, props) }
];

const Sidebar = () => {
    const { isPro } = useShinobiPro();
    const navLinks = isPro 
        ? [...baseNavLinks, ...proNavLinks]
        : baseNavLinks;
        
    const getLinkClasses = ({ isActive }) => {
        const base = "flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 text-right";
        const active = "active";
        const inactive = "hover:text-[#00f5d4]";
        return `${base} ${isActive ? active : inactive}`;
    };

  return React.createElement(
    'aside',
    { className: "sidebar-chakra fixed top-0 right-0 h-screen w-64 lg:w-72 shadow-2xl p-6 flex-col justify-between hidden md:flex border-l" },
    React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: "flex flex-col items-center mb-10 text-center" },
        React.createElement(SharinganLogo),
        React.createElement(
          'div',
          { className: "site-title-wrapper mt-4" },
          React.createElement('h1', { className: "font-cairo text-2xl font-black site-title" }, "موسوعة الشينوبي")
        )
      ),
      React.createElement(
        'nav',
        null,
        navLinks.map(link => {
            const Icon = link.icon;
            return React.createElement(
                ReactRouterDOM.NavLink,
                { key: link.path, to: link.path, className: getLinkClasses },
                 React.createElement(
                    'div',
                    { className: "flex items-center" },
                    React.createElement(Icon, { className: "w-6 h-6 ml-4" }),
                    React.createElement('span', { className: "flex-grow" }, link.name)
                )
            );
        })
      )
    )
  );
};

const BottomNav = () => {
    const { isPro } = useShinobiPro();
    const navLinks = isPro 
        ? [...baseNavLinks, ...proNavLinks]
        : baseNavLinks;

    const getLinkClasses = ({ isActive }) => {
        const base = "flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200";
        const active = "active";
        const inactive = "hover:text-[#00f5d4]";
        return `${base} ${isActive ? active : inactive}`;
    };
    return React.createElement(
        'nav',
        { className: "bottom-nav-chakra md:hidden fixed bottom-0 left-0 right-0 h-16 shadow-t-lg z-50 flex justify-around border-t" },
        navLinks.map(link => {
            const Icon = link.icon;
            return React.createElement(
                ReactRouterDOM.NavLink,
                { key: link.path, to: link.path, className: getLinkClasses },
                React.createElement(Icon, { className: "w-6 h-6 mb-1" }),
                React.createElement('span', { className: "text-xs font-medium" }, link.name)
            );
        })
    );
};

const Navigation = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Sidebar),
    React.createElement(BottomNav)
  );
};

export default Navigation;
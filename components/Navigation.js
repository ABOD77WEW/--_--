import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import SharinganLogo from './SharinganLogo.js';
import { HomeIcon, UserGroupIcon, FilmIcon, EyeIcon, FlagIcon, StarIcon, PaintBrushIcon, KeyIcon } from '@heroicons/react/24/solid';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

const baseNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props) => React.createElement(HomeIcon, props) },
  { path: '/characters', name: 'الشخصيات', icon: (props) => React.createElement(UserGroupIcon, props) },
  { path: '/arcs', name: 'الآركات', icon: (props) => React.createElement(FilmIcon, props) },
  { path: '/eyes', name: 'العيون', icon: (props) => React.createElement(EyeIcon, props) },
  { path: '/clans', name: 'العشائر', icon: (props) => React.createElement(FlagIcon, props) },
  { path: '/favorites', name: 'المفضلة', icon: (props) => React.createElement(StarIcon, props) },
];

const proNavLink = { path: '/features', name: 'الخصائص', icon: (props) => React.createElement(KeyIcon, props) };


const bottomNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props) => React.createElement(HomeIcon, props) },
  { path: '/characters', name: 'الشخصيات', icon: (props) => React.createElement(UserGroupIcon, props) },
  { path: '/arcs', name: 'الآركات', icon: (props) => React.createElement(FilmIcon, props) },
  { path: '/eyes', name: 'العيون', icon: (props) => React.createElement(EyeIcon, props) },
  { path: '/clans', name: 'العشائر', icon: (props) => React.createElement(FlagIcon, props) },
  { path: '/favorites', name: 'المفضلة', icon: (props) => React.createElement(StarIcon, props) },
];

const Sidebar = () => {
    const { isPro, openSettings } = useShinobiPro();
        
    const getLinkClasses = ({ isActive }) => {
        const base = "flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 text-right";
        const active = "active";
        const inactive = "hover:text-red-400";
        return `${base} ${isActive ? active : inactive}`;
    };

    const getProLinkClasses = ({ isActive }) => {
        const base = "pro-nav-link flex items-center w-full p-3 rounded-lg transition-all duration-200 text-right";
        const active = "active";
        const inactive = "hover:text-yellow-400";
        return `${base} ${isActive ? active : inactive}`;
    };


  return React.createElement(
    'aside',
    { className: "sidebar-chakra fixed top-0 right-0 h-screen w-64 lg:w-72 shadow-2xl p-6 flex-col justify-between hidden md:flex border-l" },
    React.createElement(
      'div',
      { className: "flex-grow flex flex-col overflow-y-auto no-scrollbar" },
      React.createElement(
        'div',
        { className: "flex flex-col items-center mb-10 text-center flex-shrink-0" },
        React.createElement(SharinganLogo),
        React.createElement(
          'div',
          { className: "site-title-wrapper mt-4" },
          React.createElement('h1', { className: "font-cairo text-2xl font-black site-title" }, "موسوعة الشينوبي")
        )
      ),
      React.createElement(
        'nav',
        { className: "flex-grow" },
        baseNavLinks.map(link => {
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
      ),
       React.createElement(
        'div',
        { className: "mt-auto pt-4 border-t border-gray-700/50 flex flex-col gap-1 flex-shrink-0" },
         isPro && (() => {
            const ProIcon = proNavLink.icon;
            return React.createElement(
                ReactRouterDOM.NavLink,
                { key: proNavLink.path, to: proNavLink.path, className: getProLinkClasses },
                React.createElement(
                    'div',
                    { className: "flex items-center" },
                    React.createElement(ProIcon, { className: "w-6 h-6 ml-4" }),
                    React.createElement('span', { className: "flex-grow font-semibold" }, proNavLink.name)
                )
            );
        })(),
         React.createElement(
            'button',
            { onClick: openSettings, className: "flex items-center w-full p-3 rounded-lg text-gray-400 hover:text-white transition-colors duration-200 text-right" },
            React.createElement(PaintBrushIcon, { className: "w-6 h-6 ml-4" }),
            React.createElement('span', { className: "font-semibold" }, "الخلفيات")
        )
      )
    )
  );
};

const BottomNav = () => {
    const { isPro, openSettings } = useShinobiPro();

    const getLinkClasses = ({ isActive }) => {
        const base = "flex flex-col items-center justify-center flex-shrink-0 w-20 h-full pt-2 pb-1 transition-all duration-200";
        const active = "active";
        const inactive = "hover:text-[#00f5d4]";
        return `${base} ${isActive ? active : inactive}`;
    };
    return React.createElement(
        'nav',
        { className: "bottom-nav-chakra md:hidden fixed bottom-0 left-0 right-0 h-16 shadow-t-lg z-50 flex flex-nowrap overflow-x-auto border-t no-scrollbar" },
        ...bottomNavLinks.map(link => {
            const Icon = link.icon;
            return React.createElement(
                ReactRouterDOM.NavLink,
                { key: link.path, to: link.path, className: getLinkClasses },
                React.createElement(Icon, { className: "w-6 h-6 mb-1" }),
                React.createElement('span', { className: "text-xs font-medium" }, link.name)
            );
        }),
        isPro && (() => {
                const ProIcon = proNavLink.icon;
                return React.createElement(
                    ReactRouterDOM.NavLink, {
                        to: proNavLink.path,
                        className: ({isActive}) => `${getLinkClasses({isActive})} ${!isActive ? 'text-yellow-400 hover:text-yellow-300' : ''}`
                    },
                    React.createElement(ProIcon, { className: "w-6 h-6 mb-1" }),
                    React.createElement('span', { className: "text-xs font-bold" }, proNavLink.name)
                )
        })(),
        React.createElement(
            'button',
            { onClick: openSettings, className: "flex flex-col items-center justify-center flex-shrink-0 w-20 h-full pt-2 pb-1 text-gray-400 hover:text-white transition-colors" },
            React.createElement(PaintBrushIcon, { className: "w-6 h-6 mb-1" }),
            React.createElement('span', { className: "text-xs font-medium" }, "الخلفيات")
        )
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
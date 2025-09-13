import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import SharinganLogo from './SharinganLogo.tsx';
import { HomeIcon, UserGroupIcon, FilmIcon, EyeIcon, FlagIcon, StarIcon } from '@heroicons/react/24/solid';
import ForbiddenScrollIcon from './icons/ForbiddenScrollIcon.tsx';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';

// --- Navigation Components ---
const baseNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props) => <HomeIcon {...props} /> },
  { path: '/characters', name: 'الشخصيات', icon: (props) => <UserGroupIcon {...props} /> },
  { path: '/arcs', name: 'الآركات', icon: (props) => <FilmIcon {...props} /> },
  { path: '/eyes', name: 'العيون', icon: (props) => <EyeIcon {...props} /> },
  { path: '/clans', name: 'العشائر', icon: (props) => <FlagIcon {...props} /> },
  { path: '/favorites', name: 'المفضلة', icon: (props) => <StarIcon {...props} /> },
];

const proNavLinks = [
    { path: '/features', name: 'الخصائص', icon: (props) => <ForbiddenScrollIcon {...props} /> }
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

  return (
    <aside className="sidebar-chakra fixed top-0 right-0 h-screen w-64 lg:w-72 shadow-2xl p-6 flex-col justify-between hidden md:flex border-l">
      <div>
        <div className="flex flex-col items-center mb-10 text-center">
            <SharinganLogo />
            <div className="site-title-wrapper mt-4">
              <h1 className="font-cairo text-2xl font-black site-title">موسوعة الشينوبي</h1>
            </div>
        </div>
        <nav>
            {navLinks.map(link => {
                const Icon = link.icon;
                return(
                    <ReactRouterDOM.NavLink key={link.path} to={link.path} className={getLinkClasses}>
                        <div className="flex items-center">
                            <Icon className="w-6 h-6 ml-4" />
                            <span className="flex-grow">{link.name}</span>
                        </div>
                    </ReactRouterDOM.NavLink>
                )}
            )}
        </nav>
      </div>
    </aside>
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
    return(
        <nav className="bottom-nav-chakra md:hidden fixed bottom-0 left-0 right-0 h-16 shadow-t-lg z-50 flex justify-around border-t">
            {navLinks.map(link => {
                const Icon = link.icon;
                 return(
                    <ReactRouterDOM.NavLink key={link.path} to={link.path} className={getLinkClasses}>
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">{link.name}</span>
                    </ReactRouterDOM.NavLink>
                )
            })}
        </nav>
    )
};

const Navigation = () => {
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  );
};

export default Navigation;
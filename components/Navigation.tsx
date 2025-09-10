


import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import SharinganLogo from './SharinganLogo';
import { HomeIcon, UserGroupIcon, FilmIcon, EyeIcon, FlagIcon, StarIcon, ClockIcon } from '@heroicons/react/24/solid';
import ForbiddenScrollIcon from './icons/ForbiddenScrollIcon';
import { useShinobiPro } from '../hooks/useShinobiPro';

// --- Navigation Components ---
const baseNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props: any) => <HomeIcon {...props} /> },
  { path: '/characters', name: 'الشخصيات', icon: (props: any) => <UserGroupIcon {...props} /> },
  { path: '/arcs', name: 'الآركات', icon: (props: any) => <FilmIcon {...props} /> },
  { path: '/eyes', name: 'العيون', icon: (props: any) => <EyeIcon {...props} /> },
  { path: '/clans', name: 'العشائر', icon: (props: any) => <FlagIcon {...props} /> },
  { path: '/favorites', name: 'المفضلة', icon: (props: any) => <StarIcon {...props} /> },
];

const proNavLinks = [
    { path: '/timeline', name: 'الخط الزمني', icon: (props: any) => <ClockIcon {...props} /> },
    { path: '/features', name: 'الخصائص', icon: (props: any) => <ForbiddenScrollIcon {...props} /> }
];

const Sidebar: React.FC = () => {
    const { isPro } = useShinobiPro();
    const navLinks = isPro 
        ? [...baseNavLinks, ...proNavLinks]
        : baseNavLinks;
        
    const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
        const base = "flex items-center w-full p-3 my-1 rounded-lg transition-all duration-200 text-right";
        const active = "bg-red-500/20 text-red-500 font-bold active";
        const inactive = "hover:bg-red-500/10";
        return `${base} ${isActive ? active : inactive}`;
    };

  return (
    <aside className="sidebar fixed top-0 right-0 h-screen w-64 lg:w-72 bg-[#1A1A1A] border-l border-[#2D3748] shadow-2xl p-6 flex-col justify-between hidden md:flex">
      <div>
        <div className="flex flex-col items-center mb-10 text-center">
            <SharinganLogo />
            <div className="relative chakra-header">
              <h1 className="font-cairo text-2xl font-black mt-4">موسوعة الشينوبي</h1>
            </div>
        </div>
        <nav>
            {navLinks.map(link => {
                const Icon = link.icon;
                return(
                    <ReactRouterDOM.NavLink key={link.path} to={link.path} className={getLinkClasses}>
                        <span className="flex-grow">{link.name}</span>
                        <Icon className="w-6 h-6 ml-3" />
                    </ReactRouterDOM.NavLink>
                )}
            )}
        </nav>
      </div>
    </aside>
  );
};

const BottomNav: React.FC = () => {
    const { isPro } = useShinobiPro();
    const navLinks = isPro 
        ? [...baseNavLinks, ...proNavLinks]
        : baseNavLinks;

    const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
        const base = "flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200";
        const active = "text-red-500 active";
        const inactive = "text-gray-400 hover:text-red-400";
        return `${base} ${isActive ? active : inactive}`;
    };
    return(
        <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1A1A1A] border-t border-[#2D3748] shadow-t-lg z-50 flex justify-around">
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

const Navigation: React.FC = () => {
  return (
    <>
      <Sidebar />
      <BottomNav />
    </>
  );
};

export default Navigation;
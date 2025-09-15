import React from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
// FIX: Switched from require to a standard ES module import for react-router-dom to fix module resolution error.
import { NavLink } from 'react-router-dom';
import SharinganLogo from './SharinganLogo.tsx';
import { HomeIcon, UserGroupIcon, FilmIcon, EyeIcon, FlagIcon, StarIcon, PaintBrushIcon, KeyIcon } from '@heroicons/react/24/solid';
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

const proNavLink = { path: '/features', name: 'الخصائص', icon: (props) => <KeyIcon {...props} /> };

const bottomNavLinks = [
  { path: '/', name: 'الرئيسية', icon: (props) => <HomeIcon {...props} /> },
  { path: '/characters', name: 'الشخصيات', icon: (props) => <UserGroupIcon {...props} /> },
  { path: '/arcs', name: 'الآركات', icon: (props) => <FilmIcon {...props} /> },
  { path: '/favorites', name: 'المفضلة', icon: (props) => <StarIcon {...props} /> },
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

  return (
    <aside className="sidebar-chakra fixed top-0 right-0 h-screen w-64 lg:w-72 shadow-2xl p-6 flex-col justify-between hidden md:flex border-l">
      <div className="flex-grow flex flex-col">
        <div className="flex flex-col items-center mb-10 text-center">
            <SharinganLogo />
            <div className="site-title-wrapper mt-4">
              <h1 className="font-cairo text-2xl font-black site-title">موسوعة الشينوبي</h1>
            </div>
        </div>
        <nav className="flex-grow">
            {baseNavLinks.map(link => {
                const Icon = link.icon;
                return(
                    // FIX: Property 'NavLink' does not exist on type 'typeof import...'.
                    <NavLink key={link.path} to={link.path} className={getLinkClasses}>
                        <div className="flex items-center">
                            <Icon className="w-6 h-6 ml-4" />
                            <span className="flex-grow">{link.name}</span>
                        </div>
                    </NavLink>
                )}
            )}
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700/50 flex flex-col gap-1">
             {isPro && (() => {
                const ProIcon = proNavLink.icon;
                return (
                    <NavLink key={proNavLink.path} to={proNavLink.path} className={getProLinkClasses}>
                        <div className="flex items-center">
                            <ProIcon className="w-6 h-6 ml-4" />
                            <span className="flex-grow font-semibold">{proNavLink.name}</span>
                        </div>
                    </NavLink>
                );
            })()}
            <button onClick={openSettings} className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:text-white transition-colors duration-200 text-right">
                <PaintBrushIcon className="w-6 h-6 ml-4" />
                <span className="font-semibold">الخلفيات</span>
            </button>
        </div>
      </div>
    </aside>
  );
};

const BottomNav = () => {
    const { openSettings } = useShinobiPro();

    const getLinkClasses = ({ isActive }) => {
        const base = "flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200";
        const active = "active";
        const inactive = "hover:text-[#00f5d4]";
        return `${base} ${isActive ? active : inactive}`;
    };
    return(
        <nav className="bottom-nav-chakra md:hidden fixed bottom-0 left-0 right-0 h-16 shadow-t-lg z-50 flex justify-around border-t">
            {bottomNavLinks.map(link => {
                const Icon = link.icon;
                 return(
                    // FIX: Property 'NavLink' does not exist on type 'typeof import...'.
                    <NavLink key={link.path} to={link.path} className={getLinkClasses}>
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">{link.name}</span>
                    </NavLink>
                )
            })}
             <button onClick={openSettings} className="flex flex-col items-center justify-center w-full pt-2 pb-1 text-gray-400 hover:text-white transition-colors">
                <PaintBrushIcon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">الخلفيات</span>
            </button>
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
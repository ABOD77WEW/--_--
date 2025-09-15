import React from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro.js';
import { XMarkIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const freeThemes = [
    { id: 'theme-default', name: 'الأصلي', class: 'preview-default' },
    { id: 'theme-sakura', name: 'الساكورا', class: 'preview-sakura' },
    { id: 'theme-midnight', name: 'منتصف الليل', class: 'preview-midnight' },
    { id: 'theme-forest', name: 'الغابة', class: 'preview-forest' },
    { id: 'theme-ocean', name: 'المحيط', class: 'preview-ocean' },
    { id: 'theme-sunset', name: 'الغروب', class: 'preview-sunset' },
];

const proThemes = [
    { id: 'theme-akatsuki', name: 'الأكاتسوكي', class: 'preview-akatsuki' },
    { id: 'theme-war', name: 'حرب الشينوبي', class: 'preview-war' },
    { id: 'theme-mist', name: 'قرية الضباب', class: 'preview-mist' },
];

const ThemePreview = ({ theme, isActive, onClick, isLocked }) => (
    React.createElement('div', { onClick: isLocked ? undefined : onClick, className: `theme-preview-card relative ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}` },
        React.createElement('div', { className: `theme-preview-visual ${theme.class}` }),
        React.createElement('div', { className: "p-3 bg-[#1A1A1A]" },
            React.createElement('h4', { className: "text-center font-bold text-lg" }, theme.name)
        ),
        (isLocked || proThemes.some(p => p.id === theme.id)) && React.createElement(
            'div', { className: "pro-badge" },
            isLocked ? React.createElement(LockClosedIcon, { className: "w-3 h-3 inline-block" }) : 'PRO'
        )
    )
);

const SettingsMenu = () => {
    const { 
        isSettingsOpen, 
        closeSettings, 
        isPro,
        backgroundTheme, 
        setBackgroundTheme 
    } = useShinobiPro();

    if (!isSettingsOpen) return null;

    const handleThemeSelect = (themeId) => {
        setBackgroundTheme(themeId);
    }

    return (
        React.createElement('div', { className: "settings-modal-bg flex items-center justify-center", onClick: closeSettings },
            React.createElement('div', { className: "settings-modal-container", onClick: (e) => e.stopPropagation() },
                React.createElement('button', { onClick: closeSettings, className: "absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full z-10", "aria-label": "إغلاق الإعدادات" },
                    React.createElement(XMarkIcon, { className: "w-8 h-8" })
                ),
                React.createElement('h2', { className: "font-cairo text-3xl font-bold text-center mb-6" }, "الخلفيات"),
                
                React.createElement('div', null,
                  React.createElement('h3', { className: "font-cairo text-xl font-bold mb-4 text-purple-300" }, "الخلفيات الأساسية"),
                  React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 gap-4" },
                      freeThemes.map(theme => (
                          React.createElement(ThemePreview, {
                              key: theme.id,
                              theme: theme,
                              isActive: backgroundTheme === theme.id,
                              onClick: () => handleThemeSelect(theme.id),
                              isLocked: false
                          })
                      ))
                  )
                ),
                React.createElement('div', { className: "mt-8" },
                    React.createElement('h3', { className: "font-cairo text-xl font-bold mb-4 text-yellow-400" }, "خلفيات برو الحصرية"),
                     React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 gap-4" },
                        proThemes.map(theme => (
                            React.createElement(ThemePreview, {
                                key: theme.id,
                                theme: theme,
                                isActive: backgroundTheme === theme.id,
                                onClick: () => handleThemeSelect(theme.id),
                                isLocked: !isPro
                            })
                        ))
                    )
                )
            )
        )
    );
};

export default SettingsMenu;
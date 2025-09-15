import React from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';
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
    <div onClick={isLocked ? undefined : onClick} className={`theme-preview-card ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}>
        <div className={`theme-preview-visual ${theme.class}`} />
        <div className="p-3 bg-[#1A1A1A]">
            <h4 className="text-center font-bold text-lg">{theme.name}</h4>
        </div>
        {(isLocked || proThemes.some(p => p.id === theme.id)) && (
            <div className="pro-badge">
                {isLocked ? <LockClosedIcon className="w-3 h-3 inline-block" /> : 'PRO'}
            </div>
        )}
    </div>
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
        <div className="settings-modal-bg flex items-center justify-center" onClick={closeSettings}>
            <div className="settings-modal-container" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeSettings} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full z-10" aria-label="إغلاق الإعدادات">
                    <XMarkIcon className="w-8 h-8" />
                </button>
                <h2 className="font-cairo text-3xl font-bold text-center mb-6">الخلفيات</h2>
                
                <div>
                  <h3 className="font-cairo text-xl font-bold mb-4 text-purple-300">الخلفيات الأساسية</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {freeThemes.map(theme => (
                          <ThemePreview 
                              key={theme.id}
                              theme={theme}
                              isActive={backgroundTheme === theme.id}
                              onClick={() => handleThemeSelect(theme.id)}
                              isLocked={false}
                          />
                      ))}
                  </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-cairo text-xl font-bold mb-4 text-yellow-400">خلفيات برو الحصرية</h3>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {proThemes.map(theme => (
                            <ThemePreview 
                                key={theme.id}
                                theme={theme}
                                isActive={backgroundTheme === theme.id}
                                onClick={() => handleThemeSelect(theme.id)}
                                isLocked={!isPro}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsMenu;
import React from 'react';
import FireIcon from './icons/techniques/FireIcon.js';
import WaterIcon from './icons/techniques/WaterIcon.js';
import EarthIcon from './icons/techniques/EarthIcon.js';
import LightningIcon from './icons/techniques/LightningIcon.js';
import WindIcon from './icons/techniques/WindIcon.js';

const Footer = () => {
  const icons = [
    { Icon: FireIcon, title: "Katon (عنصر النار)", color: "text-orange-400" },
    { Icon: WaterIcon, title: "Suiton (عنصر الماء)", color: "text-blue-400" },
    { Icon: EarthIcon, title: "Doton (عنصر الأرض)", color: "text-yellow-600" },
    { Icon: LightningIcon, title: "Raiton (عنصر البرق)", color: "text-yellow-300" },
    { Icon: WindIcon, title: "Fuuton (عنصر الرياح)", color: "text-green-300" },
  ];

  return React.createElement(
    'footer',
    { className: "legendary-footer" },
    React.createElement(
      'div',
      { className: "footer-scroll-content" },
      React.createElement(
        'div',
        { className: "footer-content text-center" },
        React.createElement('h4', null, "تم الإنشاء بواسطة عبدالله الشبلي"),
        React.createElement('p', null, "Created By: Abdullah Al-Shibli")
      ),
      React.createElement('div', { className: "footer-separator" }),
      React.createElement(
        'div',
        { className: "technique-icon-grid" },
        icons.map(({ Icon, title, color }) => React.createElement(
          'div',
          { key: title, className: "technique-icon-wrapper", title: title },
          React.createElement(Icon, { className: `w-full h-full ${color}` })
        ))
      )
    )
  );
};

export default Footer;

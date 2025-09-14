import React from 'react';

const Footer = () => {
  return React.createElement(
    'footer',
    { className: "legendary-footer" },
     React.createElement(
      'div',
      { className: "footer-content text-center" },
      React.createElement('h4', null, "تم الإنشاء بواسطة عبدالله الشبلي"),
      React.createElement('p', null, "Created By: Abdullah Al-Shibli")
    )
  );
};

export default Footer;

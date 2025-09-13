import React from 'react';

const SecretCodeIcon = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path 
      d="M17 9.5V7.5C17 4.46243 14.5376 2 11.5 2C8.46243 2 6 4.46243 6 7.5V9.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5 9.5H18C19.1046 9.5 20 10.3954 20 11.5V20C20 21.1046 19.1046 22 18 22H5C3.89543 22 3 21.1046 3 20V11.5C3 10.3954 3.89543 9.5 5 9.5Z" 
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle cx="11.5" cy="16" r="1.5" fill="currentColor"/>
    <path d="M11.5 17.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default SecretCodeIcon;
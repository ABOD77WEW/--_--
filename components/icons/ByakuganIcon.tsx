
import React from 'react';

const ByakuganIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="48" fill="#e5e7eb" />
    <circle cx="50" cy="50" r="45" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
    <circle cx="50" cy="50" r="8" fill="#d1d5db" />
    <path d="M20 50 Q35 40, 50 50" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.7"/>
    <path d="M80 50 Q65 60, 50 50" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.7"/>
    <path d="M50 20 Q40 35, 50 50" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.7"/>
    <path d="M50 80 Q60 65, 50 50" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.7"/>
  </svg>
);

export default ByakuganIcon;

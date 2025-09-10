import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.js';
import { arcs } from '../data/arcs.js';
import { eyes } from '../data/eyes.js';
import { clans } from '../data/clans.js';
import { useShinobiPro } from '../hooks/useShinobiPro.js';

const categoryMap = {
  characters: { name: 'الشخصيات', path: '/characters' },
  arcs: { name: 'الآركات', path: '/arcs' },
  eyes: { name: 'العيون', path: '/eyes' },
  clans: { name: 'العشائر', path: '/clans' },
};

const GlobalSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ characters: [], arcs: [], eyes: [], clans: [] });
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const { isAkatsukiTheme } = useShinobiPro();

  const performSearch = useCallback((currentQuery) => {
    if (!currentQuery) {
      setResults({ characters: [], arcs: [], eyes: [], clans: [] });
      return;
    }
    const lowerCaseQuery = currentQuery.toLowerCase();
    const newResults = {
      characters: characters.filter(c => c.name.toLowerCase().includes(lowerCaseQuery)).slice(0, 3),
      arcs: arcs.filter(a => a.name.toLowerCase().includes(lowerCaseQuery)).slice(0, 3),
      eyes: eyes.filter(e => e.name.toLowerCase().includes(lowerCaseQuery)).slice(0, 3),
      clans: clans.filter(c => c.name.toLowerCase().includes(lowerCaseQuery)).slice(0, 3),
    };
    setResults(newResults);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(query);
    }, 200);

    return () => clearTimeout(handler);
  }, [query, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalResults = Object.values(results).reduce((acc, val) => acc + val.length, 0);
  const showDropdown = isFocused && query.length > 0;

  const handleLinkClick = () => {
    setQuery('');
    setIsFocused(false);
  };

  const baseClasses = "flex items-center rounded-full shadow-lg overflow-hidden";
  const themeClasses = isAkatsukiTheme ? "akatsuki-search-bar" : "bg-[#210f2c] border-2 border-[#e9d8f3]";
  const iconBgClasses = isAkatsukiTheme ? "akatsuki-search-bar-icon-bg" : "bg-[#e9d8f3]";
  const iconStrokeClasses = isAkatsukiTheme ? "akatsuki-search-bar-icon-stroke" : "stroke-[#210f2c]";
  const dropdownClasses = isAkatsukiTheme ? "akatsuki-search-dropdown" : "bg-[#1e1e24] border border-[#2D3748]";

  return React.createElement(
    'div',
    { className: "relative w-full max-w-xl mx-auto", ref: searchRef },
    React.createElement(
      'div',
      { className: `${baseClasses} ${themeClasses}` },
      React.createElement('input', {
        type: "text",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        onFocus: () => setIsFocused(true),
        placeholder: "ابحث في الموسوعة كلها...",
        className: "w-full px-5 py-3 bg-transparent placeholder-[#9e8ea9] focus:outline-none",
      }),
      React.createElement(
        'div',
        { className: `p-2 m-1.5 rounded-full ${iconBgClasses}` },
        React.createElement(
          'svg',
          { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "2.5", stroke: "currentColor", className: `w-6 h-6 ${iconStrokeClasses}` },
          React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" })
        )
      )
    ),
    showDropdown && React.createElement(
      'div',
      { className: `absolute top-full mt-2 w-full rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto ${dropdownClasses}` },
      totalResults > 0 ? (
        React.createElement(
          'div',
          { className: "p-2" },
          Object.entries(results).map(([category, items]) => {
            if (items.length === 0) return null;
            const catInfo = categoryMap[category];
            return React.createElement(
              'div',
              { key: category, className: "mb-2 last:mb-0" },
              React.createElement('h4', { className: "text-sm font-bold px-3 pt-2 pb-1" }, catInfo.name),
              React.createElement(
                'ul',
                null,
                items.map(item => React.createElement(
                  'li',
                  { key: `${category}-${item.id}` },
                  React.createElement(
                    ReactRouterDOM.Link,
                    {
                      to: catInfo.path,
                      state: { selectedId: item.id },
                      onClick: handleLinkClick,
                      className: "block w-full text-right px-3 py-2 text-gray-200 rounded-lg transition-colors",
                    },
                    item.name
                  )
                ))
              )
            );
          })
        )
      ) : (
        React.createElement('p', { className: "p-4 text-center text-gray-400" }, "لا توجد نتائج بحث...")
      )
    )
  );
};

export default GlobalSearchBar;

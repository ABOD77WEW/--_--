import React, { useState, useEffect, useRef, useCallback } from 'react';
// FIX: Replaced named imports with a namespace import for 'react-router-dom' to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { characters } from '../data/characters.ts';
import { arcs } from '../data/arcs.ts';
import { eyes } from '../data/eyes.ts';
import { clans } from '../data/clans.ts';
import { useShinobiPro } from '../hooks/useShinobiPro.ts';

const categoryMap = {
  characters: { name: 'الشخصيات', category: 'characters' },
  arcs: { name: 'الآركات', category: 'arcs' },
  eyes: { name: 'العيون', category: 'eyes' },
  clans: { name: 'العشائر', category: 'clans' },
};

const GlobalSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ characters: [], arcs: [], eyes: [], clans: [] });
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const { isAkatsukiTheme, openDetailView } = useShinobiPro();

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
    }, 200); // Debounce search

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

  // FIX: Replaced Object.values().reduce() with direct property access to fix type inference issue, which caused a comparison error.
  const totalResults = results.characters.length + results.arcs.length + results.eyes.length + results.clans.length;
  const showDropdown = isFocused && query.length > 0;

  const handleResultClick = (item, category) => {
    setQuery('');
    setIsFocused(false);
    openDetailView(item, category);
  }
  
  const baseClasses = "flex items-center rounded-full shadow-lg overflow-hidden";
  const themeClasses = isAkatsukiTheme ? "akatsuki-search-bar" : "bg-[#210f2c] border-2 border-[#e9d8f3]";
  const iconBgClasses = isAkatsukiTheme ? "akatsuki-search-bar-icon-bg" : "bg-[#e9d8f3]";
  const iconStrokeClasses = isAkatsukiTheme ? "akatsuki-search-bar-icon-stroke" : "stroke-[#210f2c]";
  const dropdownClasses = isAkatsukiTheme ? "akatsuki-search-dropdown" : "bg-[#1e1e24] border border-[#2D3748]";


  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
      <div className={`${baseClasses} ${themeClasses}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="ابحث في الموسوعة كلها..."
          className="w-full px-5 py-3 bg-transparent placeholder-[#9e8ea9] focus:outline-none"
        />
        <div className={`p-2 m-1.5 rounded-full ${iconBgClasses}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={`w-6 h-6 ${iconStrokeClasses}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {showDropdown && (
        <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto ${dropdownClasses}`}>
          {totalResults > 0 ? (
            <div className="p-2">
              {/* FIX: Added explicit types for map parameters to resolve 'unknown' type error on `items`. */}
              {Object.entries(results).map(([category, items]) => {
                if (items.length === 0) return null;
                const catInfo = categoryMap[category];
                return (
                  <div key={category} className="mb-2 last:mb-0">
                    <h4 className="text-sm font-bold px-3 pt-2 pb-1">{catInfo.name}</h4>
                    <ul>
                      {items.map(item => (
                        <li key={`${category}-${item.id}`}>
                          <button
                            onClick={() => handleResultClick(item, catInfo.category)}
                            className="block w-full text-right px-3 py-2 text-gray-200 rounded-lg transition-colors hover:bg-white/10"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="p-4 text-center text-gray-400">لا توجد نتائج بحث...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '', compact = false }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`theme-switch-container inline-flex items-center p-1 rounded-full border transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#121622] border-white/10 shadow-inner'
          : 'bg-slate-200/90 border-slate-300/80 shadow-inner'
      } ${className}`}
      role="radiogroup"
      aria-label="Color theme switcher"
    >
      {/* Light Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        onClick={() => setTheme('light')}
        className={`relative flex items-center gap-1.5 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
        } ${
          theme === 'light'
            ? 'bg-white text-amber-600 shadow-md scale-[1.02] font-bold'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        title="Switch to Light Theme"
      >
        <Sun className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${theme === 'light' ? 'text-amber-500 animate-spin-slow' : 'text-slate-400'}`} />
        <span>Light</span>
      </button>

      {/* Dark Option Button */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={`relative flex items-center gap-1.5 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
        } ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02] font-bold'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Switch to Dark Theme"
      >
        <Moon className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${theme === 'dark' ? 'text-indigo-200' : 'text-slate-600'}`} />
        <span>Dark</span>
      </button>
    </div>
  );
}

'use client';

import React from 'react';
import { useTheme } from '@/hooks';

export const ThemeDebug = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
      <div>Theme: {theme}</div>
      <div>Is Dark: {isDark ? 'Yes' : 'No'}</div>
      <button
        onClick={toggleTheme}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs"
      >
        Toggle
      </button>
      <div className="mt-2 text-xs">
        CSS Vars:
        <div>
          --color-bg-main:{' '}
          {getComputedStyle(document.documentElement).getPropertyValue('--color-bg-main') ||
            'NOT SET'}
        </div>
        <div>
          --color-text-main:{' '}
          {getComputedStyle(document.documentElement).getPropertyValue('--color-text-main') ||
            'NOT SET'}
        </div>
      </div>
    </div>
  );
};

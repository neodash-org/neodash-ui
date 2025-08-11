'use client';

import React from 'react';
import { useTheme } from '@/hooks';

export default function TestThemePage() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-main">Theme Test Page</h1>

      <div className="space-y-4">
        <div>
          <p className="text-main">Current Theme: {theme}</p>
          <p className="text-main">Is Dark: {isDark ? 'Yes' : 'No'}</p>
        </div>

        <button onClick={toggleTheme} className="px-4 py-2 bg-primary text-white rounded-lg">
          Toggle Theme
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-bg-card border border-border-light rounded-lg">
            <p className="text-main">Background Card</p>
            <p className="text-text-muted">Muted Text</p>
          </div>

          <div className="p-4 bg-bg-sidebar border border-border-light rounded-lg">
            <p className="text-main">Sidebar Background</p>
            <p className="text-neon-pink">Neon Pink Text</p>
          </div>
        </div>

        <div className="p-4 bg-bg-main border border-border-light rounded-lg">
          <h3 className="text-main font-bold">CSS Variables Debug:</h3>
          <pre className="text-main text-sm mt-2">
            {JSON.stringify(
              {
                '--color-bg-main': getComputedStyle(document.documentElement).getPropertyValue(
                  '--color-bg-main',
                ),
                '--color-text-main': getComputedStyle(document.documentElement).getPropertyValue(
                  '--color-text-main',
                ),
                '--color-primary': getComputedStyle(document.documentElement).getPropertyValue(
                  '--color-primary',
                ),
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

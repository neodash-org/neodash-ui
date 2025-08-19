'use client';

import React from 'react';
import { useTheme } from '@/hooks';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'md', showLabel = false }) => {
  const { isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center justify-between">
      {showLabel && <span className="text-white font-medium">Theme</span>}
      <button
        onClick={toggleTheme}
        className={`relative ${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95`}
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Moon className={`${iconSizes[size]} text-neon-cyan`} />
        ) : (
          <Sun className={`${iconSizes[size]} text-neon-yellow`} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;

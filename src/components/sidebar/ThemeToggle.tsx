'use client';

import React from 'react';
import { useTheme, usePostHog } from '@/hooks';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  'data-testid'?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  showLabel = false,
  'data-testid': testId,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { trackThemeChange } = usePostHog();
  const { t } = useTranslation();

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
    <div className="flex items-center justify-between" data-testid={testId || 'theme-toggle'}>
      {showLabel && (
        <span className="text-white font-medium" data-testid="theme-label">
          {t('settings.appearance')}
        </span>
      )}
      <button
        onClick={() => {
          const newTheme = isDark ? 'light' : 'dark';
          trackThemeChange(isDark ? 'dark' : 'light', newTheme);
          toggleTheme();
        }}
        className={`relative ${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95`}
        aria-label={t('actions.toggleTheme')}
        data-testid="theme-toggle-button"
        data-theme={isDark ? 'dark' : 'light'}
      >
        {isDark ? (
          <Moon className={`${iconSizes[size]} text-neon-cyan`} data-testid="moon-icon" />
        ) : (
          <Sun className={`${iconSizes[size]} text-neon-yellow`} data-testid="sun-icon" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;

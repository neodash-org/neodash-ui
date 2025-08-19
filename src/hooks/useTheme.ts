import { useState, useEffect } from 'react';
import { themes, ThemeName } from '@/design-system/themes';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeName>('dark');

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    // Apply background colors
    Object.entries(currentTheme.bg).forEach(([key, value]) => {
      root.style.setProperty(`--color-bg-${key}`, value);
    });

    // Apply text colors
    Object.entries(currentTheme.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, value);
    });

    // Apply border colors
    Object.entries(currentTheme.border).forEach(([key, value]) => {
      root.style.setProperty(`--color-border-${key}`, value);
    });

    // Apply neon colors
    Object.entries(currentTheme.neon).forEach(([key, value]) => {
      root.style.setProperty(`--color-neon-${key}`, value);
    });

    // Apply semantic colors
    root.style.setProperty('--color-primary', currentTheme.primary);
    root.style.setProperty('--color-secondary', currentTheme.secondary);
    root.style.setProperty('--color-success', currentTheme.success);
    root.style.setProperty('--color-warning', currentTheme.warning);

    // Update document class for theme-specific CSS
    root.classList.remove('light-mode', 'dark-mode');
    root.classList.add(`${theme}-mode`);
  }, [theme]);

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('neodash-theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('neodash-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setThemeByName = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setThemeByName,
    currentTheme: themes[theme],
  };
};

'use client';

import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const savedTheme = localStorage.getItem('neodash-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('neodash-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-mode', !isDark);
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return { isDark, toggleDarkMode };
};

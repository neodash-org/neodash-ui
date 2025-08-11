'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useDarkMode } from '../hooks/useDarkMode';

const Header = () => {
  const pathname = usePathname();
  const { isDark, toggleDarkMode } = useDarkMode();

  // Get page title from pathname
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/portfolio':
        return 'Portfolio';
      case '/analytics':
        return 'Analytics';
      case '/settings':
        return 'Settings';
      case '/bridge':
        return 'Bridge';
      default:
        return 'Dashboard';
    }
  };

  const title = getPageTitle(pathname);

  return (
    <div className="flex items-center justify-between gap-8 flex-wrap px-4 py-5 pt-4 pb-6">
      {/* Title */}
      <h1 className="text-neon-pink font-bold text-3xl tracking-widest m-0 drop-shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] font-[var(--font-cyberpunk)]">
        {title}
      </h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-bg-card/70 border border-neon-cyan rounded-full text-white text-base px-6 py-2 outline-none shadow-[0_0_8px_#00fff0] font-[var(--font-sans)] min-w-[220px] max-w-[320px] flex-1 mr-6 placeholder:text-gray-400"
      />
      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`relative bg-bg-card/70 border border-white/10 rounded-full w-12 h-7 flex items-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95 ${
            isDark ? 'justify-end' : 'justify-start'
          }`}
          aria-label="Toggle dark mode"
        >
          <span
            className={`block w-6 h-6 bg-gradient-to-br from-neon-pink to-neon-cyan rounded-full shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] transition-all duration-300 ${
              isDark ? 'translate-x-0' : 'translate-x-5'
            }`}
          />
        </button>
        {/* Notification Icon */}
        <div className="w-8 h-8 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan text-lg shadow-[0_0_8px_var(--color-neon-cyan)] cursor-pointer hover:scale-110 transition-transform">
          🔔
        </div>
        {/* Connect Wallet */}
        <button className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-bold font-[var(--font-cyberpunk)] text-base px-6 py-2 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] cursor-pointer tracking-wide transition hover:scale-105">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Header;

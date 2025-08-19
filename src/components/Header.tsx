'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme, usePostHog } from '@/hooks';
import { Moon, Sun, Bell } from 'lucide-react';
import { getPageTitle } from '@/utils/pageTitle';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { trackFeatureUsage, trackThemeChange } = usePostHog();

  const title = getPageTitle(pathname);

  return (
    <div className="flex items-center justify-between gap-4 md:gap-8 flex-wrap px-4 py-5 pt-4 pb-6">
      {/* Left side: Logo (mobile) + Route Title */}
      <div className="flex items-center gap-4">
        {/* NEODASH Logo - Only visible on mobile */}
        <div className="md:hidden w-8 h-8">
          <Image src="/neodash-icon.svg" alt="NEODASH" width={32} height={32} />
        </div>

        {/* Route Title - Only visible on desktop */}
        <h1 className="hidden md:block text-neon-pink text-2xl md:text-3xl tracking-widest drop-shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] font-[var(--font-cyberpunk)]">
          {title}
        </h1>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Dark Mode Toggle - Using Lucide icons */}
        <button
          onClick={() => {
            const newTheme = isDark ? 'light' : 'dark';
            trackThemeChange(isDark ? 'dark' : 'light', newTheme, { source: 'header' });
            toggleTheme();
          }}
          data-testid="theme-toggle"
          className="w-8 h-8 md:w-8 md:h-8 bg-bg-card/70 border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Toggle dark mode"
        >
          {isDark ? (
            <Moon className="w-4 h-4 md:w-4 md:h-4 text-neon-cyan" />
          ) : (
            <Sun className="w-4 h-4 md:w-4 md:h-4 text-neon-yellow" />
          )}
        </button>

        {/* Notification Icon - Visible on both mobile and desktop */}
        <div
          onClick={() => trackFeatureUsage('notifications', 'clicked', { location: 'header' })}
          data-testid="notification-icon"
          className="flex w-8 h-8 rounded-full bg-neon-cyan/10 items-center justify-center text-neon-cyan shadow-[0_0_8px_var(--color-neon-cyan)] cursor-pointer hover:scale-110 transition-transform"
        >
          <Bell className="w-4 h-4 text-neon-cyan" />
        </div>

        {/* Connect Wallet */}
        <button
          onClick={() =>
            trackFeatureUsage('wallet_connection', 'attempted', { location: 'header' })
          }
          className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] text-sm md:text-base px-4 md:px-6 py-2 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] cursor-pointer tracking-wide transition hover:scale-105"
        >
          Connect Wallet
        </button>

        {/* Mobile Menu Button - Only visible on mobile, positioned on the right */}
        <button
          onClick={() => {
            trackFeatureUsage('mobile_menu', isMobileMenuOpen ? 'closed' : 'opened', {
              location: 'header',
            });
            onMobileMenuToggle();
          }}
          data-testid="mobile-menu-button"
          className="md:hidden w-10 h-10 bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 hover:scale-105"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;

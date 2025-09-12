'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme, usePostHog } from '@/hooks';
import { Moon, Sun, Bell, Wallet } from 'lucide-react';
import { getPageTitle } from '@/utils/pageTitle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useWallet } from '@/lib/wallet/hooks';
import { Button } from '@/design-system/components';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { trackFeatureUsage, trackThemeChange } = usePostHog();
  const { t } = useTranslation();
  const { openModal } = useWallet();

  const title = getPageTitle(pathname);

  return (
    <div className="flex items-center justify-between gap-4 md:gap-8 flex-wrap px-4 py-5 pt-4 pb-6">
      {/* Left side: Logo (mobile) + Route Title (desktop) */}
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
      <div className="flex items-center gap-3 md:gap-5">
        {/* Dark Mode Toggle - Hidden on mobile, visible on desktop */}
        <button
          onClick={() => {
            const newTheme = isDark ? 'light' : 'dark';
            trackThemeChange(isDark ? 'dark' : 'light', newTheme, { source: 'header' });
            toggleTheme();
          }}
          data-testid="theme-toggle"
          className="hidden md:flex w-8 h-8 bg-bg-card/70 border border-white/10 rounded-full items-center justify-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label={t('actions.toggleTheme')}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-neon-cyan" />
          ) : (
            <Sun className="w-4 h-4 text-neon-yellow" />
          )}
        </button>

        {/* Language Switcher - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block">
          <LanguageSwitcher variant="dropdown" size="md" />
        </div>

        {/* Notification Icon - Visible on both mobile and desktop */}
        <div
          onClick={() => trackFeatureUsage('notifications', 'clicked', { location: 'header' })}
          data-testid="notification-icon"
          className="flex w-8 h-8 rounded-full bg-neon-cyan/10 items-center justify-center text-neon-cyan shadow-[0_0_8px_var(--color-neon-cyan)] cursor-pointer hover:scale-110 transition-transform"
        >
          <Bell className="w-4 h-4 text-neon-cyan" />
        </div>

        {/* Wallet Icon - Visible on mobile only */}
        <div
          onClick={() => {
            trackFeatureUsage('wallet_connection', 'modal_opened', { location: 'header_mobile' });
            openModal();
          }}
          data-testid="mobile-wallet-icon"
          className="md:hidden flex w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink items-center justify-center text-white shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] cursor-pointer hover:scale-110 transition-transform"
        >
          <Wallet className="w-4 h-4 text-white" />
        </div>

        {/* Wallet Section - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex">
          <ConnectButton.Custom>
            {({ account, chain, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const evmConnected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated');

              return (
                <Button
                  onClick={() => {
                    trackFeatureUsage('wallet_connection', 'modal_opened', { location: 'header' });
                    openModal();
                  }}
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-2 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] tracking-wide transition hover:scale-105"
                  data-testid="connect-wallet-button"
                >
                  {evmConnected ? 'Manage Wallets' : t('wallet.connect')}
                </Button>
              );
            }}
          </ConnectButton.Custom>
        </div>

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
          aria-label={isMobileMenuOpen ? t('actions.closeMenu') : t('actions.openMenu')}
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

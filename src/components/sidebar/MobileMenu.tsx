'use client';

import React from 'react';
import MobileHeader from './MobileHeader';
import MobileNavigation from './MobileNavigation';
import ThemeToggle from './ThemeToggle';
import { usePostHog } from '@/hooks';
import { useWallet } from '@/lib/wallet/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/design-system/components';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { trackFeatureUsage } = usePostHog();
  const { openModal } = useWallet();
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        data-testid="mobile-menu-overlay"
        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
        onClick={() => {
          trackFeatureUsage('mobile_menu', 'closed', { method: 'backdrop_click' });
          onClose();
        }}
      />

      {/* Mobile Menu */}
      <aside
        data-testid="mobile-menu"
        className="md:hidden fixed left-0 top-0 h-full w-80 bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] z-[201] transform transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        <MobileHeader onClose={onClose} />

        {/* Wallet Button */}
        <div className="px-6 py-4">
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
                    trackFeatureUsage('wallet_connection', 'modal_opened', {
                      location: 'mobile_menu',
                    });
                    openModal();
                  }}
                  variant="primary"
                  size="md"
                  className="w-full bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-3 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] tracking-wide transition hover:scale-105"
                  data-testid="mobile-connect-wallet-button"
                >
                  {evmConnected ? 'Manage Wallets' : t('wallet.connect')}
                </Button>
              );
            }}
          </ConnectButton.Custom>
        </div>

        <MobileNavigation onItemClick={onClose} />

        {/* Divider */}
        <div className="px-6">
          <div className="border-t border-white/10" />
        </div>

        {/* Theme Toggle */}
        <div className="px-6 py-3">
          <ThemeToggle size="sm" showLabel={true} data-testid="mobile-menu-theme-toggle" />
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;

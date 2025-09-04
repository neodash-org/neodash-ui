'use client';

import React from 'react';
import MobileHeader from './MobileHeader';
import MobileNavigation from './MobileNavigation';
import ThemeToggle from './ThemeToggle';
import MobileFooter from './MobileFooter';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { usePostHog } from '@/hooks';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { trackFeatureUsage } = usePostHog();
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
        className="md:hidden fixed left-0 top-0 h-full w-80 bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] z-[201] transform transition-transform duration-300 ease-in-out"
      >
        <MobileHeader onClose={onClose} />
        <MobileNavigation onItemClick={onClose} />

        {/* Divider */}
        <div className="px-6">
          <div className="border-t border-white/10" />
        </div>

        {/* Theme Toggle */}
        <div className="p-6">
          <ThemeToggle size="lg" showLabel={true} data-testid="mobile-menu-theme-toggle" />
        </div>

        {/* Language Switcher */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm font-medium">{t('settings.language')}</span>
            <LanguageSwitcher variant="dropdown" size="sm" />
          </div>
        </div>

        <MobileFooter />
      </aside>
    </>
  );
};

export default MobileMenu;

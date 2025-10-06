'use client';

import React from 'react';
import MobileLeftPanelHeader from './MobileLeftPanelHeader';
import MobileNavigation from './MobileNavigation';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Divider from '@/components/ui/divider';
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
        className="md:hidden fixed left-0 top-0 h-full w-80 bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] z-[201] transform transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        <MobileLeftPanelHeader onClose={onClose} />
        <MobileNavigation onItemClick={onClose} />

        {/* Divider */}
        <div className="px-6">
          <Divider />
        </div>

        {/* Appearance Section */}
        <div className="px-6 py-3">
          <div className="space-y-3">
            <ThemeToggle size="sm" showLabel={true} data-testid="mobile-menu-theme-toggle" />
            <div className="flex items-center justify-between">
              <span className="text-gray-900 dark:text-white font-medium">
                {t('common.language')}
              </span>
              <LanguageSwitcher
                variant="dropdown"
                size="sm"
                showLabel={false}
                data-testid="mobile-menu-language-switcher"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </aside>
    </>
  );
};

export default MobileMenu;

'use client';

import React from 'react';
import { usePostHog } from '@/hooks';
import { useTranslation } from 'react-i18next';

interface MobileLeftPanelHeaderProps {
  onClose: () => void;
}

const MobileLeftPanelHeader: React.FC<MobileLeftPanelHeaderProps> = ({ onClose }) => {
  const { trackFeatureUsage } = usePostHog();
  const { t } = useTranslation();

  return (
    <div className="px-5 py-3 border-b border-white/10">
      {/* Header row: Logo + Actions */}
      <div className="flex items-center justify-between">
        <div className="text-white font-[var(--font-cyberpunk)] tracking-wide text-lg">
          {t('app.name')}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            trackFeatureUsage('mobile_menu', 'closed', { method: 'close_button' });
            onClose();
          }}
          data-testid="mobile-menu-close"
          className="w-8 h-8 bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300"
          aria-label={t('actions.closeMenu')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MobileLeftPanelHeader;

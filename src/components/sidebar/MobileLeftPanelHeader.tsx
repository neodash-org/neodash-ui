'use client';

import React from 'react';
import { usePostHog } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { XIcon } from 'lucide-react';

interface MobileLeftPanelHeaderProps {
  onClose: () => void;
}

const MobileLeftPanelHeader: React.FC<MobileLeftPanelHeaderProps> = ({ onClose }) => {
  const { trackFeatureUsage } = usePostHog();
  const { t } = useTranslation();

  return (
    <div className="px-5 py-3 border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="text-gray-900 dark:text-white font-[var(--font-cyberpunk)] tracking-wide text-lg">
          {t('app.name')}
        </div>
        <button
          onClick={() => {
            trackFeatureUsage('mobile_menu', 'closed', { method: 'close_button' });
            onClose();
          }}
          data-testid="mobile-menu-close"
          className="w-8 h-8 bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300"
          aria-label={t('actions.closeMenu')}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MobileLeftPanelHeader;

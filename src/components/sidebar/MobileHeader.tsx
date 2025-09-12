'use client';

import React from 'react';
import Image from 'next/image';
import { usePostHog } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Bell } from 'lucide-react';

interface MobileHeaderProps {
  onClose: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onClose }) => {
  const { trackFeatureUsage } = usePostHog();
  const { t } = useTranslation();

  return (
    <div className="p-5 border-b border-white/10">
      {/* Header row: Logo + Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Image src="/neodash-icon.svg" alt="NeoDash" width={32} height={32} className="w-8 h-8" />
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Icon */}
          <div
            onClick={() =>
              trackFeatureUsage('notifications', 'clicked', { location: 'mobile_menu' })
            }
            className="flex w-8 h-8 rounded-full bg-neon-cyan/10 items-center justify-center text-neon-cyan shadow-[0_0_8px_var(--color-neon-cyan)] cursor-pointer hover:scale-110 transition-transform"
          >
            <Bell className="w-4 h-4 text-neon-cyan" />
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
    </div>
  );
};

export default MobileHeader;

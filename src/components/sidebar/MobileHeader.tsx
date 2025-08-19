'use client';

import React from 'react';
import { usePostHog } from '@/hooks';

interface MobileHeaderProps {
  onClose: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onClose }) => {
  const { trackFeatureUsage } = usePostHog();
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">N</span>
        </div>
        <h2 className="text-xl text-white font-[var(--font-cyberpunk)]">NEODASH</h2>
      </div>
      <button
        onClick={() => {
          trackFeatureUsage('mobile_menu', 'closed', { method: 'close_button' });
          onClose();
        }}
        data-testid="mobile-menu-close"
        className="w-8 h-8 bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300"
        aria-label="Close mobile menu"
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
  );
};

export default MobileHeader;

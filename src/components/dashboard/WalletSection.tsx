import React from 'react';
import { WalletInfo } from '@/components/wallet';

const WalletSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)] mb-2">
          Connected Wallets
        </h2>
        <p className="text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]">
          Manage your connected wallets and view detailed information
        </p>
      </div>

      <WalletInfo />
    </div>
  );
};

export default WalletSection;

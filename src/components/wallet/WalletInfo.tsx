import React from 'react';
import { EvmWalletInfoCard, SolanaWalletInfoCard } from './info';

const WalletInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      <EvmWalletInfoCard />
      <SolanaWalletInfoCard />
    </div>
  );
};

export default WalletInfo;

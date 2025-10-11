import React from 'react';
import { EcosystemSelector } from '../../ecosystem';
import { WalletType } from '@/lib/wallet/types';

interface WalletConnectionViewProps {
  selectedEcosystem: WalletType | null;
  onEcosystemSelect: (type: WalletType | null) => void;
  onClose: () => void;
  evmConnected: boolean;
  dataTestId?: string;
}

export const WalletConnectionView: React.FC<WalletConnectionViewProps> = ({
  selectedEcosystem,
  onEcosystemSelect,
  onClose,
  evmConnected,
  dataTestId = 'ecosystem-selector',
}) => {
  return (
    <EcosystemSelector
      onSelect={onEcosystemSelect}
      onClose={onClose}
      selectedEcosystem={selectedEcosystem}
      data-testid={dataTestId}
      evmConnected={evmConnected}
    />
  );
};

import React from 'react';
import { WalletType } from '@/lib/wallet/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { ECOSYSTEM_DATA, ECOSYSTEM_TYPES } from '@/lib/wallet/ecosystem-constants';
import { EvmEcosystemCard } from './EvmEcosystemCard';
import { SolanaEcosystemCard } from './SolanaEcosystemCard';
import SolanaWalletSelector from '../selectors/SolanaWalletSelector';

interface EcosystemSelectorProps {
  onSelect: (type: WalletType | null) => void;
  onClose: () => void;
  selectedEcosystem?: WalletType | null;
  'data-testid'?: string;
  hideConnectedEcosystems?: boolean;
  evmConnected?: boolean;
}

const EcosystemSelector: React.FC<EcosystemSelectorProps> = ({
  onSelect,
  onClose,
  selectedEcosystem,
  'data-testid': dataTestId,
  hideConnectedEcosystems = false,
  evmConnected = false,
}) => {
  const { publicKey: solanaPublicKey } = useWallet();

  // Filter out connected ecosystems if hideConnectedEcosystems is true
  const ecosystems = ECOSYSTEM_DATA.filter((ecosystem) => {
    if (!hideConnectedEcosystems) return true;

    if (ecosystem.type === ECOSYSTEM_TYPES.EVM) {
      return !evmConnected;
    }

    if (ecosystem.type === ECOSYSTEM_TYPES.SOLANA) {
      return !solanaPublicKey;
    }

    return true;
  });

  // If Solana ecosystem is selected, show Solana wallet selector
  if (selectedEcosystem === ECOSYSTEM_TYPES.SOLANA) {
    return (
      <SolanaWalletSelector
        onBack={() => onSelect(null)}
        onClose={onClose}
        data-testid="solana-wallet-selector"
      />
    );
  }

  // Component map for clean ecosystem rendering
  const ecosystemComponents: Record<
    string,
    (ecosystem: (typeof ECOSYSTEM_DATA)[0]) => React.JSX.Element
  > = {
    [ECOSYSTEM_TYPES.EVM]: (ecosystem: (typeof ECOSYSTEM_DATA)[0]) => (
      <EvmEcosystemCard key={ecosystem.type} onClose={onClose} data-testid="evm-ecosystem-card" />
    ),
    [ECOSYSTEM_TYPES.SOLANA]: (ecosystem: (typeof ECOSYSTEM_DATA)[0]) => (
      <SolanaEcosystemCard
        key={ecosystem.type}
        onSelect={onSelect}
        data-testid="solana-ecosystem-card"
      />
    ),
  };

  return (
    <div className="space-y-4 pb-6" data-testid={dataTestId || 'ecosystem-selector'}>
      <div className="grid gap-3">
        {ecosystems.map((ecosystem) => ecosystemComponents[ecosystem.type]?.(ecosystem) || null)}
      </div>
    </div>
  );
};

export default EcosystemSelector;

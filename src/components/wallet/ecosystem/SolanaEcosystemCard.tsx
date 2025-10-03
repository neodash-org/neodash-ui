import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletType } from '@/lib/wallet/types';
import { EcosystemCard } from './EcosystemCard';
import { ECOSYSTEM_TYPES } from '@/lib/wallet/ecosystem-constants';

interface SolanaEcosystemCardProps {
  onSelect: (type: WalletType | null) => void;
  'data-testid'?: string;
}

export const SolanaEcosystemCard: React.FC<SolanaEcosystemCardProps> = ({
  onSelect,
  'data-testid': dataTestId,
}) => {
  const { publicKey: solanaPublicKey } = useWallet();
  const isConnected = !!solanaPublicKey;

  const connectedInfo = isConnected
    ? `Connected: ${solanaPublicKey.toString().slice(0, 4)}...${solanaPublicKey.toString().slice(-4)}`
    : undefined;

  return (
    <EcosystemCard
      ecosystem={{
        type: ECOSYSTEM_TYPES.SOLANA,
        name: 'Solana',
        description: 'Connect to Solana blockchain',
        icon: '🟣',
        wallets: ['Phantom', 'Solflare'],
        color: 'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/20',
        textColor:
          'text-purple-700 dark:text-neon-pink dark:drop-shadow-[0_0_4px_var(--color-neon-pink)]',
        hoverColor:
          'hover:shadow-lg dark:hover:shadow-[0_0_24px_var(--color-neon-pink-66),0_0_32px_var(--color-neon-cyan-44)]',
        borderColor:
          'border-purple-200 dark:border-neon-pink/40 hover:border-purple-400 dark:hover:border-neon-pink/60',
        shadowColor:
          'shadow-[0_0_8px_var(--color-purple-500)] dark:shadow-[0_0_16px_var(--color-neon-pink-44)]',
      }}
      isConnected={isConnected}
      connectedInfo={connectedInfo}
      onClick={() => onSelect(ECOSYSTEM_TYPES.SOLANA as WalletType)}
      disabled={isConnected}
      data-testid={dataTestId || 'solana-ecosystem-card'}
    />
  );
};

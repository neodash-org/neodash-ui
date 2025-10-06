import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EcosystemCard } from './EcosystemCard';
import { ECOSYSTEM_TYPES } from '@/lib/wallet/ecosystem-constants';
import { AUTH_STATUS } from '@/lib/wallet/auth-constants';

interface EvmEcosystemCardProps {
  onClose: () => void;
  'data-testid'?: string;
}

export const EvmEcosystemCard: React.FC<EvmEcosystemCardProps> = ({
  onClose,
  'data-testid': dataTestId,
}) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== AUTH_STATUS.LOADING;
        const isEvmConnected = Boolean(
          ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === AUTH_STATUS.AUTHENTICATED),
        );

        const connectedInfo =
          isEvmConnected && account ? `Connected: ${account.displayName}` : undefined;

        return (
          <EcosystemCard
            ecosystem={{
              type: ECOSYSTEM_TYPES.EVM,
              name: 'Ethereum',
              description: 'Connect to Ethereum and EVM-compatible chains',
              icon: '🔷',
              wallets: ['MetaMask', 'Rainbow', 'Coinbase', 'Trust'],
              color: 'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-cyan-900/20',
              textColor:
                'text-blue-700 dark:text-neon-cyan dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]',
              hoverColor:
                'hover:shadow-lg dark:hover:shadow-[0_0_24px_var(--color-neon-cyan-66),0_0_32px_var(--color-neon-pink-44)]',
              borderColor:
                'border-blue-200 dark:border-neon-cyan/40 hover:border-blue-400 dark:hover:border-neon-cyan/60',
              shadowColor:
                'shadow-[0_0_8px_var(--color-blue-500)] dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]',
            }}
            isConnected={isEvmConnected}
            connectedInfo={connectedInfo}
            onClick={() => {
              // Close our custom modal before opening RainbowKit to avoid stacked dialogs
              onClose();
              if (isEvmConnected) {
                openAccountModal();
              } else {
                openConnectModal();
              }
            }}
            data-testid={dataTestId || 'evm-ecosystem-card'}
          />
        );
      }}
    </ConnectButton.Custom>
  );
};

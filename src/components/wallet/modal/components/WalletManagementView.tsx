import React from 'react';
import { Separator } from '@/design-system/components';
import { useTranslation } from 'react-i18next';
import { EcosystemSelector } from '../../ecosystem';
import { EvmWalletCard } from './EvmWalletCard';
import { SolanaWalletCard } from './SolanaWalletCard';
import { WalletType } from '@/lib/wallet/types';

interface WalletManagementViewProps {
  evmConnected: boolean;
  evmAccount: { address: string } | null;
  solanaConnected: boolean;
  solanaWallet: { address: string; name?: string | null } | null;
  onEcosystemSelect: (type: WalletType | null) => void;
  onClose: () => void;
  onSwitchNetwork: () => void;
  isMobile: boolean;
}

export const WalletManagementView: React.FC<WalletManagementViewProps> = ({
  evmConnected,
  evmAccount,
  solanaConnected,
  solanaWallet,
  onEcosystemSelect,
  onClose,
  onSwitchNetwork,
  isMobile,
}) => {
  const { t } = useTranslation();
  // All disconnect/switch handlers are delegated to card components

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">{t('wallet.manageWallets')}</p>
      </div>

      {/* EVM Connection Status - only show if EVM is connected */}
      {evmConnected && evmAccount && (
        <>
          <EvmWalletCard
            account={evmAccount}
            isMobile={isMobile}
            onSwitchNetwork={onSwitchNetwork}
            onClose={onClose}
          />
          <Separator />
        </>
      )}

      {/* Solana Wallet Management */}
      {solanaConnected && solanaWallet && (
        <>
          <SolanaWalletCard wallet={solanaWallet} isMobile={isMobile} onClose={onClose} />
          <Separator />
        </>
      )}

      {/* Additional Ecosystems - only show if not all ecosystems are connected */}
      {(!evmConnected || !solanaConnected) && (
        <div>
          <EcosystemSelector
            onSelect={onEcosystemSelect}
            onClose={onClose}
            selectedEcosystem={null}
            data-testid="additional-ecosystem-selector"
            hideConnectedEcosystems={true}
            evmConnected={evmConnected}
          />
        </div>
      )}
    </div>
  );
};

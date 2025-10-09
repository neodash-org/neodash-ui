import React from 'react';
import { Card, Button } from '@/design-system/components';
import { useTranslation } from 'react-i18next';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { AddressDisplay } from './AddressDisplay';

interface SolanaWalletCardProps {
  wallet: { address: string; name?: string | null };
  isMobile: boolean;
  onClose: () => void;
}

export const SolanaWalletCard: React.FC<SolanaWalletCardProps> = ({
  wallet,
  isMobile,
  onClose,
}) => {
  const { t } = useTranslation();
  const { disconnect } = useWallet();

  const handleDisconnect = async () => {
    try {
      await disconnect('solana');
      onClose();
    } catch (error) {
      console.error('Failed to disconnect Solana wallet:', error);
    }
  };

  return (
    <Card
      className="dark:bg-gradient-to-br dark:from-neon-pink/5 dark:to-neon-cyan/5 dark:border-neon-pink/30 dark:shadow-[0_0_16px_var(--color-neon-pink-44)]"
      data-testid="solana-connection-status"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🟣</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                {t('wallet.solanaConnected')}
              </h4>
              <div className="w-2 h-2 bg-green-500 dark:bg-neon-green rounded-full shadow-[0_0_4px_var(--color-green-500)] dark:shadow-[0_0_4px_var(--color-neon-green)]"></div>
            </div>
            <AddressDisplay
              address={wallet.address}
              isMobile={isMobile}
              dataTestId="copy-solana-address-icon"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {wallet?.name || 'Solana Wallet'}
            </p>
          </div>
        </div>

        <div className={isMobile ? 'space-y-2' : 'flex gap-2'}>
          <Button
            variant="outline"
            size={isMobile ? 'md' : 'sm'}
            onClick={handleDisconnect}
            className={`${isMobile ? 'w-full' : 'flex-1'} rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105`}
            data-testid="disconnect-solana-button"
          >
            {t('wallet.disconnect')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

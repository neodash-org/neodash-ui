import React from 'react';
import { Card, Button, Separator } from '@/design-system/components';
import { useTranslation } from 'react-i18next';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

interface ConnectedWalletCardProps {
  walletName: string;
  address: string;
  onClose: () => void;
}

export const ConnectedWalletCard: React.FC<ConnectedWalletCardProps> = ({
  walletName,
  address,
  onClose,
}) => {
  const { t } = useTranslation();
  const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-green)] mb-2">
          {t('wallet.solanaConnected')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-green)]">
          {t('wallet.walletSuccessfullyConnected')}
        </p>
      </div>

      <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
            <div>
              <div className="font-medium text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                {walletName}
              </div>
              <div className="text-sm text-gray-400 font-mono">{short}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <WalletDisconnectButton className="!bg-transparent !border !border-neon-pink/30 !text-neon-pink hover:!border-neon-pink hover:!shadow-[0_0_8px_var(--color-neon-pink)] hover:!scale-105 !transition-all !duration-300 !rounded-full !px-4 !py-2 !font-[var(--font-cyberpunk)] !tracking-wide" />
          </div>
        </div>
      </Card>

      <Separator />

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={onClose}
          className="dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
        >
          {t('common.close')}
        </Button>
      </div>
    </div>
  );
};

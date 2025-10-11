import React from 'react';
import { Card, Button } from '@/design-system/components';
import { useTranslation } from 'react-i18next';
import { useDisconnect } from 'wagmi';
import { AddressDisplay } from './AddressDisplay';

interface EvmWalletCardProps {
  account: { address: string };
  isMobile: boolean;
  onSwitchNetwork: () => void;
  onClose: () => void;
}

export const EvmWalletCard: React.FC<EvmWalletCardProps> = ({
  account,
  isMobile,
  onSwitchNetwork,
  onClose,
}) => {
  const { t } = useTranslation();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  return (
    <Card
      className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]"
      data-testid="evm-connection-status"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔷</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                {t('wallet.ethereumConnected')}
              </h4>
              <div className="w-2 h-2 bg-green-500 dark:bg-neon-green rounded-full shadow-[0_0_4px_var(--color-green-500)] dark:shadow-[0_0_4px_var(--color-neon-green)]"></div>
            </div>
            <AddressDisplay
              address={account.address}
              isMobile={isMobile}
              dataTestId="copy-address-icon"
            />
          </div>
        </div>

        <div className={isMobile ? 'space-y-2' : 'flex gap-2'}>
          {isMobile ? (
            <>
              <Button
                variant="outline"
                size="md"
                onClick={onSwitchNetwork}
                className="w-full rounded-none border-b-4 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
                data-testid="switch-network-button"
              >
                {t('wallet.switchNetwork')}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleDisconnect}
                className="w-full rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105"
                data-testid="disconnect-button"
              >
                {t('wallet.disconnect')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchNetwork}
                className="flex-1 rounded-none border-b-4 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
                data-testid="switch-network-button"
              >
                {t('wallet.switchNetwork')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="flex-1 rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105"
                data-testid="disconnect-button"
              >
                {t('wallet.disconnect')}
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

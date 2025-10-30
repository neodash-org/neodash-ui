import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/design-system/components';
import { usePostHog } from '@/hooks';

const EvmWalletConnector: React.FC = () => {
  const { trackFeatureUsage } = usePostHog();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (connected) {
          return (
            <Button
              onClick={() => {
                trackFeatureUsage('evm_wallet', 'account_modal_opened', { location: 'header' });
                openAccountModal();
              }}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)] hover:scale-105 transition-all duration-300"
            >
              <div className="w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_4px_var(--color-neon-cyan)]"></div>
              <span className="text-sm">{account.displayName}</span>
            </Button>
          );
        }

        return (
          <Button
            onClick={() => {
              trackFeatureUsage('evm_wallet', 'connection_attempted', { location: 'header' });
              openConnectModal();
            }}
            variant="primary"
            size="sm"
            className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] px-4 py-2 shadow-[0_0_8px_var(--color-neon-cyan),0_0_16px_var(--color-neon-pink)] tracking-wide transition hover:scale-105"
          >
            EVM Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default EvmWalletConnector;

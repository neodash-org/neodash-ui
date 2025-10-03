import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Card, Button, Separator } from '@/design-system/components';

interface SolanaWalletSelectorProps {
  onBack: () => void;
  onClose: () => void;
  'data-testid'?: string;
}

const SolanaWalletSelector: React.FC<SolanaWalletSelectorProps> = ({
  onBack,
  onClose,
  'data-testid': dataTestId,
}) => {
  const { connected, publicKey, wallet, wallets, select, connect } = useWallet();

  // Filter to only show installed and available Solana wallets
  const availableWallets = React.useMemo(() => {
    const validWallets = wallets.filter((wallet) => {
      const name = wallet.adapter.name.toLowerCase();
      // Only include known Solana wallets that are actually available
      return (
        ['phantom', 'solflare', 'backpack', 'glow'].includes(name) &&
        wallet.adapter.readyState === 'Installed'
      );
    });

    console.log(
      'Installed Solana wallets:',
      validWallets.map((w) => w.adapter.name),
    );
    return validWallets;
  }, [wallets]);

  // Auto-close modal after successful connection
  React.useEffect(() => {
    if (connected && publicKey) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Close after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [connected, publicKey, onClose]);

  if (connected && publicKey) {
    return (
      <div className="space-y-4" data-testid={dataTestId || 'solana-wallet-connected'}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-green)] mb-2">
            Solana Wallet Connected
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-green)]">
            Your Solana wallet is successfully connected. This modal will close automatically.
          </p>
        </div>

        <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
              <div>
                <div className="font-medium text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                  {wallet?.adapter.name || 'Solana Wallet'}
                </div>
                <div className="text-sm text-gray-400 font-mono">
                  {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                </div>
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
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid={dataTestId || 'solana-wallet-selector'}>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="p-2 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
          data-testid="back-button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
            Connect Solana Wallet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose your preferred Solana wallet
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]">
          <div className="text-center py-6">
            <div className="text-4xl mb-4 dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
              🟣
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)] mb-2">
              Solana Wallets
            </h4>
            <p className="text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)] mb-4">
              Connect with Phantom, Solflare, or other Solana wallets
            </p>

            {/* Manual wallet selection with proper confirmation flow */}
            {availableWallets.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {availableWallets.map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    variant="outline"
                    size="md"
                    onClick={async () => {
                      try {
                        // First select the wallet and wait for it to complete
                        await select(wallet.adapter.name);

                        // Then connect with confirmation
                        await connect();
                      } catch (error) {
                        console.error('Wallet connection failed:', error);
                      }
                    }}
                    className="!bg-gradient-to-r !from-neon-cyan !to-neon-pink !text-white !border-none !rounded-full !font-[var(--font-cyberpunk)] !px-6 !py-2 !shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] !tracking-wide !transition !hover:scale-105"
                  >
                    Connect {wallet.adapter.name}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">🔌</div>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-lg">
                  No Solana wallets installed
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Install a Solana wallet extension to connect
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-300">Recommended:</p>
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    <a
                      href="https://phantom.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan hover:shadow-[0_0_8px_var(--color-neon-cyan)] transition-all"
                    >
                      📱 Phantom (Most Popular)
                    </a>
                    <a
                      href="https://solflare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan hover:shadow-[0_0_8px_var(--color-neon-cyan)] transition-all"
                    >
                      ⚡ Solflare
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolanaWalletSelector;

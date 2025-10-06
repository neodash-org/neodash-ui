import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, Button } from '@/design-system/components';
import { SelectorHeader } from './components/SelectorHeader';
import { ConnectedWalletCard } from './components/ConnectedWalletCard';
import { useSolanaWalletList } from './hooks/useSolanaWalletList';
import { useSolanaConnectFlow } from './hooks/useSolanaConnectFlow';

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
  const availableWallets = useSolanaWalletList(wallets);
  const { connectWallet } = useSolanaConnectFlow(select, connect);

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
      <ConnectedWalletCard
        walletName={wallet?.adapter.name || 'Solana Wallet'}
        address={publicKey.toString()}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="space-y-4" data-testid={dataTestId || 'solana-wallet-selector'}>
      <SelectorHeader
        title="Connect Solana Wallet"
        subtitle="Choose your preferred Solana wallet"
        onBack={onBack}
      />

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
                      const res = await connectWallet(wallet.adapter.name);
                      if (!res.ok) {
                        const error = res.error as Error;
                        if (!error?.message?.includes('WalletNotSelectedError')) {
                          console.error('Wallet connection failed:', error);
                        }
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

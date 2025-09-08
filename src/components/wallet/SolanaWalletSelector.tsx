import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Card, Button, Separator } from '@/design-system/components';

interface SolanaWalletSelectorProps {
  onBack: () => void;
  onClose: () => void;
}

const SolanaWalletSelector: React.FC<SolanaWalletSelectorProps> = ({ onBack, onClose }) => {
  const { connected, publicKey, wallet } = useWallet();

  if (connected && publicKey) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-green)] mb-2">
            Solana Wallet Connected
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-green)]">
            Your Solana wallet is successfully connected
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
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="p-2 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
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

            {/* Custom styled Solana wallet button */}
            <div className="flex justify-center">
              <WalletMultiButton className="!bg-gradient-to-r !from-neon-cyan !to-neon-pink !text-white !border-none !rounded-full !font-[var(--font-cyberpunk)] !px-6 !py-2 !shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] !tracking-wide !transition !hover:scale-105" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SolanaWalletSelector;

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, Badge, Separator } from '@/design-system/components';

const WalletInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* EVM Wallet Info */}
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const evmConnected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          if (evmConnected) {
            return (
              <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🔷</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                        Ethereum Wallet
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Connected to {chain.name}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="success"
                    className="dark:bg-neon-green/20 dark:text-neon-green dark:border-neon-green/30"
                  >
                    Connected
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Address:</span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      {account.displayName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Network:</span>
                    <div className="flex items-center gap-2">
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            overflow: 'hidden',
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 16, height: 16 }}
                            />
                          )}
                        </div>
                      )}
                      <span className="text-sm text-gray-900 dark:text-white">{chain.name}</span>
                    </div>
                  </div>

                  {account.displayBalance && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Balance:</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {account.displayBalance}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex gap-2">
                    <button
                      onClick={openChainModal}
                      className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-neon-cyan/10 dark:border dark:border-neon-cyan/30 dark:text-neon-cyan dark:hover:bg-neon-cyan/20 rounded-lg transition-colors"
                    >
                      Switch Network
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-neon-pink/10 dark:border dark:border-neon-pink/30 dark:text-neon-pink dark:hover:bg-neon-pink/20 rounded-lg transition-colors"
                    >
                      Manage Account
                    </button>
                  </div>
                </div>
              </Card>
            );
          }

          return null;
        }}
      </ConnectButton.Custom>

      {/* Solana Wallet Info */}
      <SolanaWalletInfo />
    </div>
  );
};

const SolanaWalletInfo: React.FC = () => {
  const { connected, publicKey, wallet } = useWallet();

  if (connected && publicKey) {
    return (
      <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-pink/30 dark:shadow-[0_0_16px_var(--color-neon-pink-44)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🟣</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                Solana Wallet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connected to Solana Mainnet
              </p>
            </div>
          </div>
          <Badge
            variant="success"
            className="dark:bg-neon-green/20 dark:text-neon-green dark:border-neon-green/30"
          >
            Connected
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Address:</span>
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Wallet:</span>
            <span className="text-sm text-gray-900 dark:text-white">
              {wallet?.adapter.name || 'Unknown'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Network:</span>
            <span className="text-sm text-gray-900 dark:text-white">Solana Mainnet</span>
          </div>

          <Separator />

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-neon-pink/10 dark:border dark:border-neon-pink/30 dark:text-neon-pink dark:hover:bg-neon-pink/20 rounded-lg transition-colors">
              View Transactions
            </button>
            <button className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-neon-pink/10 dark:border dark:border-neon-pink/30 dark:text-neon-pink dark:hover:bg-neon-pink/20 rounded-lg transition-colors">
              Manage Account
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return null;
};

export default WalletInfo;

import React, { useState } from 'react';
import { Modal, Card, Button, Separator } from '@/design-system/components';
import { useWallet } from '@/lib/wallet/hooks';
import { WalletType } from '@/lib/wallet/types';
import EcosystemSelector from './EcosystemSelector';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnectionModal: React.FC = () => {
  const { isModalOpen, closeModal, error, setError } = useWallet();
  const [selectedEcosystem, setSelectedEcosystem] = useState<WalletType | null>(null);

  const handleEcosystemSelect = (type: WalletType | null) => {
    setSelectedEcosystem(type);
    setError(null);
  };

  const handleClose = () => {
    setSelectedEcosystem(null);
    setError(null);
    closeModal();
  };

  const renderContent = () => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const evmConnected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          // If EVM is connected, show connection status and management options
          if (evmConnected) {
            return (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-green)] mb-2">
                    Wallet Management
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-green)]">
                    Manage your connected wallets and connect to additional ecosystems
                  </p>
                </div>

                {/* EVM Connection Status */}
                <Card className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🔷</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                            Ethereum Connected
                          </h4>
                          <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {account.displayName} • {chain.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openChainModal}
                        className="dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
                      >
                        Switch Network
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openAccountModal}
                        className="dark:border-neon-pink/30 dark:hover:border-neon-pink dark:hover:shadow-[0_0_8px_var(--color-neon-pink)] dark:hover:scale-105"
                      >
                        Manage Account
                      </Button>
                    </div>
                  </div>
                </Card>

                <Separator />

                {/* Additional Ecosystems */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide mb-3">
                    Connect Additional Ecosystems
                  </h4>
                  <EcosystemSelector
                    onSelect={handleEcosystemSelect}
                    onClose={handleClose}
                    selectedEcosystem={selectedEcosystem}
                  />
                </div>
              </div>
            );
          }

          // If not connected, show ecosystem selection
          return (
            <EcosystemSelector
              onSelect={handleEcosystemSelect}
              onClose={handleClose}
              selectedEcosystem={selectedEcosystem}
            />
          );
        }}
      </ConnectButton.Custom>
    );
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const evmConnected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <Modal
            isOpen={isModalOpen}
            onClose={handleClose}
            title={evmConnected ? 'Manage Wallets' : 'Connect Wallet'}
            size="md"
            className="max-w-md"
          >
            {error && (
              <Card className="mb-4 border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 dark:shadow-[0_0_16px_var(--color-red-44)]">
                <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 dark:drop-shadow-[0_0_4px_var(--color-red)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                    {error}
                  </span>
                </div>
              </Card>
            )}

            {renderContent()}
          </Modal>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectionModal;

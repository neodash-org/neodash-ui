import React, { useState } from 'react';
import { Modal, Card, Button, Separator } from '@/design-system/components';
import { useWallet } from '@/lib/wallet/hooks';
import { WalletType } from '@/lib/wallet/types';
import EcosystemSelector from './EcosystemSelector';
import WalletStatus from './WalletStatus';

const WalletConnectionModal: React.FC = () => {
  const { isModalOpen, closeModal, isConnected, error, setError } = useWallet();
  const [selectedEcosystem, setSelectedEcosystem] = useState<WalletType | null>(null);

  const handleEcosystemSelect = (type: WalletType) => {
    setSelectedEcosystem(type);
    setError(null);
  };

  const handleBack = () => {
    setSelectedEcosystem(null);
    setError(null);
  };

  const handleClose = () => {
    setSelectedEcosystem(null);
    setError(null);
    closeModal();
  };

  const renderContent = () => {
    if (isConnected) {
      return (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Wallet Connected
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your wallet is successfully connected
            </p>
          </div>

          <WalletStatus />

          <Separator />

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      );
    }

    if (selectedEcosystem) {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleBack} className="p-2">
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Connect {selectedEcosystem === 'evm' ? 'Ethereum' : 'Solana'} Wallet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred wallet
              </p>
            </div>
          </div>

          {/* TODO: Implement actual wallet connection logic */}
          <Card className="text-center py-8">
            <div className="text-4xl mb-4">{selectedEcosystem === 'evm' ? '🔷' : '🟣'}</div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wallet connection for {selectedEcosystem === 'evm' ? 'Ethereum' : 'Solana'} will be
              available soon.
            </p>
            <Button variant="outline" onClick={handleBack}>
              Back to Ecosystem Selection
            </Button>
          </Card>
        </div>
      );
    }

    return <EcosystemSelector onSelect={handleEcosystemSelect} onClose={handleClose} />;
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title="Connect Wallet"
      size="md"
      className="max-w-md"
    >
      {error && (
        <Card className="mb-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </Card>
      )}

      {renderContent()}
    </Modal>
  );
};

export default WalletConnectionModal;

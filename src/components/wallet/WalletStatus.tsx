import React from 'react';
import { Badge, Button } from '@/design-system/components';
import { useWallet, useWalletBalance } from '@/lib/wallet/hooks';

const WalletStatus: React.FC = () => {
  const { wallet, isConnected, disconnectWallet } = useWallet();
  const { shortAddress, formattedBalance, currency } = useWalletBalance();

  if (!isConnected || !wallet) {
    return null;
  }

  const getStatusColor = () => {
    switch (wallet.type) {
      case 'evm':
        return 'info';
      case 'solana':
        return 'success';
      default:
        return 'default';
    }
  };

  const getWalletIcon = () => {
    switch (wallet.name) {
      case 'MetaMask':
        return '🦊';
      case 'Phantom':
        return '👻';
      case 'Rainbow':
        return '🌈';
      case 'Coinbase':
        return '🔵';
      default:
        return '💳';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Wallet Info */}
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getWalletIcon()}</span>
        <div className="text-sm">
          <div className="font-medium text-gray-900 dark:text-white">{wallet.name}</div>
          <div className="text-gray-500 dark:text-gray-400">{shortAddress}</div>
        </div>
      </div>

      {/* Balance */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {formattedBalance} {currency}
      </div>

      {/* Status Badge */}
      <Badge variant={getStatusColor()} size="sm">
        {wallet.type.toUpperCase()}
      </Badge>

      {/* Disconnect Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={disconnectWallet}
        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default WalletStatus;

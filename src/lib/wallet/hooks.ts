import { useCallback } from 'react';
import { useWallet } from '@/context/WalletContext';

// Main wallet hook (re-export from context)
export { useWallet };

// Custom hook for wallet connection
export const useWalletConnection = () => {
  const { connect, disconnect, status, currentWallet, error } = useWallet();

  const connectWallet = useCallback(async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  }, [connect]);

  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error('Wallet disconnection failed:', err);
    }
  }, [disconnect]);

  return {
    connectWallet,
    disconnectWallet,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    hasError: status === 'error',
    wallet: currentWallet,
    error,
  };
};

// Custom hook for wallet balance
export const useWalletBalance = () => {
  const { currentWallet } = useWallet();

  const getFormattedBalance = useCallback(() => {
    if (!currentWallet?.balance) return '0.00';

    const balance = parseFloat(currentWallet.balance);
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`;
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`;
    } else {
      return balance.toFixed(4);
    }
  }, [currentWallet?.balance]);

  const getShortAddress = useCallback(() => {
    if (!currentWallet?.address) return '';

    const address = currentWallet.address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [currentWallet?.address]);

  return {
    balance: currentWallet?.balance || '0',
    formattedBalance: getFormattedBalance(),
    shortAddress: getShortAddress(),
    fullAddress: currentWallet?.address || '',
    currency: currentWallet?.type === 'evm' ? 'ETH' : 'SOL',
  };
};

// Custom hook for wallet transactions
export const useWalletTransaction = () => {
  const { currentWallet } = useWallet();

  const sendTransaction = useCallback(
    async (to: string, amount: string) => {
      if (!currentWallet) {
        throw new Error('No wallet connected');
      }

      // TODO: Implement actual transaction logic
      // This will be implemented when we add RainbowKit and Solana adapters

      console.log(`Sending ${amount} to ${to} via ${currentWallet.type} wallet`);

      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        success: true,
      };
    },
    [currentWallet],
  );

  const signMessage = useCallback(
    async (message: string) => {
      if (!currentWallet) {
        throw new Error('No wallet connected');
      }

      // TODO: Implement actual message signing logic
      console.log(`Signing message "${message}" with ${currentWallet.type} wallet`);

      // Simulate signing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        signature: '0x' + Math.random().toString(16).substr(2, 128),
        success: true,
      };
    },
    [currentWallet],
  );

  return {
    sendTransaction,
    signMessage,
    canSendTransactions: !!currentWallet,
  };
};

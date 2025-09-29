import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { WalletContextType, WalletType, WalletInfo, WalletStatus } from '@/lib/wallet/types';
import { useAccount, useDisconnect as useWagmiDisconnect } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

// Extended context type for the hook
type ExtendedWalletContextType = WalletContextType & {
  evmWallet: WalletInfo | null;
  solanaWallet: WalletInfo | null;
  connectedWallets: WalletInfo[];
};

// Context
const WalletContext = createContext<ExtendedWalletContextType | undefined>(undefined);

// Provider
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simple state for modal and errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EVM wallet integration
  const { address: evmAddress, isConnected: isEvmConnected, chain } = useAccount();
  const { disconnect: disconnectEvm } = useWagmiDisconnect();

  // Solana wallet integration
  const {
    publicKey: solanaPublicKey,
    connected: isSolanaConnected,
    wallet: solanaWallet,
  } = useSolanaWallet();

  // Derive wallet states from existing hooks - no complex state management
  const evmWallet = useMemo((): WalletInfo | null => {
    if (isEvmConnected && evmAddress && chain) {
      return {
        address: evmAddress,
        type: 'evm',
        name: 'EVM Wallet',
        chainId: chain.id,
      };
    }
    return null;
  }, [isEvmConnected, evmAddress, chain]);

  const solanaWalletInfo = useMemo((): WalletInfo | null => {
    if (isSolanaConnected && solanaPublicKey && solanaWallet) {
      return {
        address: solanaPublicKey.toBase58(),
        type: 'solana',
        name: solanaWallet.adapter.name,
      };
    }
    return null;
  }, [isSolanaConnected, solanaPublicKey, solanaWallet]);

  const connectedWallets = useMemo((): WalletInfo[] => {
    return [evmWallet, solanaWalletInfo].filter(Boolean) as WalletInfo[];
  }, [evmWallet, solanaWalletInfo]);

  const status: WalletStatus = connectedWallets.length > 0 ? 'connected' : 'disconnected';
  const currentWallet = connectedWallets[0] || null;

  const connect = useCallback(async () => {
    try {
      setError(null);
      // The actual connection is handled by RainbowKit and Solana wallet adapters
      // This function is mainly for opening the appropriate modal
      setIsModalOpen(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Connection failed');
    }
  }, []);

  const disconnect = useCallback(
    async (type?: WalletType) => {
      try {
        if (type === 'evm' && isEvmConnected) {
          disconnectEvm();
        } else if (type === 'solana' && isSolanaConnected) {
          // Solana disconnect is handled by the wallet adapter
        } else {
          // Disconnect all wallets
          if (isEvmConnected) disconnectEvm();
        }
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Disconnection failed');
      }
    },
    [isEvmConnected, isSolanaConnected, disconnectEvm],
  );

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value: ExtendedWalletContextType = {
    status,
    currentWallet,
    error,
    isModalOpen,
    connect,
    disconnect,
    openModal,
    closeModal,
    setError,
    isConnected: status === 'connected',
    wallet: currentWallet,
    disconnectWallet: disconnect,
    evmWallet,
    solanaWallet: solanaWalletInfo,
    connectedWallets,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Hook
export const useWallet = (): ExtendedWalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

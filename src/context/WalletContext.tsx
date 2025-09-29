import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { WalletContextType, WalletState, WalletType, WalletInfo } from '@/lib/wallet/types';
import { useAccount, useDisconnect as useWagmiDisconnect } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';

// Extended state to handle multiple wallets
interface ExtendedWalletState extends WalletState {
  evmWallet: WalletInfo | null;
  solanaWallet: WalletInfo | null;
  connectedWallets: WalletInfo[];
}

const initialState: ExtendedWalletState = {
  status: 'disconnected',
  currentWallet: null,
  error: null,
  isModalOpen: false,
  evmWallet: null,
  solanaWallet: null,
  connectedWallets: [],
};

// Action types
type WalletAction =
  | { type: 'SET_STATUS'; payload: WalletState['status'] }
  | { type: 'SET_WALLET'; payload: WalletInfo | null }
  | { type: 'SET_EVM_WALLET'; payload: WalletInfo | null }
  | { type: 'SET_SOLANA_WALLET'; payload: WalletInfo | null }
  | { type: 'UPDATE_CONNECTED_WALLETS' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'RESET' };

// Reducer
const walletReducer = (state: ExtendedWalletState, action: WalletAction): ExtendedWalletState => {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_WALLET':
      return { ...state, currentWallet: action.payload };
    case 'SET_EVM_WALLET':
      return { ...state, evmWallet: action.payload };
    case 'SET_SOLANA_WALLET':
      return { ...state, solanaWallet: action.payload };
    case 'UPDATE_CONNECTED_WALLETS':
      const connectedWallets = [state.evmWallet, state.solanaWallet].filter(
        Boolean,
      ) as WalletInfo[];
      return {
        ...state,
        connectedWallets,
        status: connectedWallets.length > 0 ? 'connected' : 'disconnected',
        currentWallet: connectedWallets[0] || null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // EVM wallet integration
  const { address: evmAddress, isConnected: isEvmConnected, chain } = useAccount();
  const { disconnect: disconnectEvm } = useWagmiDisconnect();

  // Solana wallet integration
  const {
    publicKey: solanaPublicKey,
    connected: isSolanaConnected,
    wallet: solanaWallet,
  } = useSolanaWallet();

  // Sync EVM wallet state
  useEffect(() => {
    if (isEvmConnected && evmAddress && chain) {
      const evmWalletInfo: WalletInfo = {
        address: evmAddress,
        type: 'evm',
        name: 'EVM Wallet', // We'll get the actual wallet name from RainbowKit
        chainId: chain.id,
      };
      dispatch({ type: 'SET_EVM_WALLET', payload: evmWalletInfo });
    } else {
      dispatch({ type: 'SET_EVM_WALLET', payload: null });
    }
    dispatch({ type: 'UPDATE_CONNECTED_WALLETS' });
  }, [isEvmConnected, evmAddress, chain]);

  // Sync Solana wallet state
  useEffect(() => {
    if (isSolanaConnected && solanaPublicKey && solanaWallet) {
      const solanaWalletInfo: WalletInfo = {
        address: solanaPublicKey.toBase58(),
        type: 'solana',
        name: solanaWallet.adapter.name,
      };
      dispatch({ type: 'SET_SOLANA_WALLET', payload: solanaWalletInfo });
    } else {
      dispatch({ type: 'SET_SOLANA_WALLET', payload: null });
    }
    dispatch({ type: 'UPDATE_CONNECTED_WALLETS' });
  }, [isSolanaConnected, solanaPublicKey, solanaWallet]);

  const connect = useCallback(async () => {
    try {
      dispatch({ type: 'SET_STATUS', payload: 'connecting' });
      dispatch({ type: 'SET_ERROR', payload: null });

      // The actual connection is handled by RainbowKit and Solana wallet adapters
      // This function is mainly for opening the appropriate modal
      dispatch({ type: 'OPEN_MODAL' });

      // The wallet state will be updated via the useEffect hooks above
      // when the actual connection happens through the UI components
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Connection failed',
      });
      dispatch({ type: 'SET_STATUS', payload: 'error' });
    }
  }, []);

  const disconnect = useCallback(
    async (type?: WalletType) => {
      try {
        if (type === 'evm' && isEvmConnected) {
          disconnectEvm();
        } else if (type === 'solana' && isSolanaConnected) {
          // Solana disconnect is handled by the wallet adapter
          // The useEffect will update the state when disconnection happens
        } else {
          // Disconnect all wallets
          if (isEvmConnected) disconnectEvm();
          // Solana disconnect is handled by the wallet adapter
        }

        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'Disconnection failed',
        });
      }
    },
    [isEvmConnected, isSolanaConnected, disconnectEvm],
  );

  const openModal = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL' });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
    openModal,
    closeModal,
    setError,
    // Computed properties
    isConnected: state.status === 'connected',
    wallet: state.currentWallet,
    disconnectWallet: disconnect,
    // Additional properties for multi-wallet support
    evmWallet: state.evmWallet,
    solanaWallet: state.solanaWallet,
    connectedWallets: state.connectedWallets,
  } as WalletContextType & {
    evmWallet: WalletInfo | null;
    solanaWallet: WalletInfo | null;
    connectedWallets: WalletInfo[];
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Extended context type for the hook
type ExtendedWalletContextType = WalletContextType & {
  evmWallet: WalletInfo | null;
  solanaWallet: WalletInfo | null;
  connectedWallets: WalletInfo[];
};

// Hook
export const useWallet = (): ExtendedWalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context as ExtendedWalletContextType;
};

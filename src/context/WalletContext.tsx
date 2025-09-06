import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { WalletContextType, WalletState, WalletType, WalletInfo } from '@/lib/wallet/types';

// Initial state
const initialState: WalletState = {
  status: 'disconnected',
  currentWallet: null,
  error: null,
  isModalOpen: false,
};

// Action types
type WalletAction =
  | { type: 'SET_STATUS'; payload: WalletState['status'] }
  | { type: 'SET_WALLET'; payload: WalletInfo | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'RESET' };

// Reducer
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'SET_WALLET':
      return { ...state, currentWallet: action.payload };
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

  const connect = useCallback(async (type: WalletType) => {
    try {
      dispatch({ type: 'SET_STATUS', payload: 'connecting' });
      dispatch({ type: 'SET_ERROR', payload: null });

      // TODO: Implement actual wallet connection logic
      // This will be implemented when we add RainbowKit and Solana adapters

      // For now, simulate connection
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockWallet: WalletInfo = {
        address: '0x1234567890123456789012345678901234567890',
        type,
        name: type === 'evm' ? 'MetaMask' : 'Phantom',
        balance: '1.234',
        chainId: type === 'evm' ? 1 : undefined,
      };

      dispatch({ type: 'SET_WALLET', payload: mockWallet });
      dispatch({ type: 'SET_STATUS', payload: 'connected' });
      dispatch({ type: 'CLOSE_MODAL' });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Connection failed',
      });
      dispatch({ type: 'SET_STATUS', payload: 'error' });
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      dispatch({ type: 'SET_STATUS', payload: 'disconnected' });
      dispatch({ type: 'SET_WALLET', payload: null });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Disconnection failed',
      });
    }
  }, []);

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
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

// Hook
export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

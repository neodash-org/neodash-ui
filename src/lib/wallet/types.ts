export type WalletType = 'evm' | 'solana';

export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletInfo {
  address: string;
  type: WalletType;
  name: string;
  icon?: string;
  balance?: string;
  chainId?: number;
}

export interface WalletState {
  status: WalletStatus;
  currentWallet: WalletInfo | null;
  error: string | null;
  isModalOpen: boolean;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  openModal: () => void;
  openManagementModal: () => void;
  closeModal: () => void;
  setError: (error: string | null) => void;
  // Computed properties
  isConnected: boolean;
  wallet: WalletInfo | null;
  disconnectWallet: () => Promise<void>;
}

export interface EVMChain {
  id: number;
  name: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface SolanaCluster {
  name: string;
  rpcUrl: string;
  wsUrl?: string;
}

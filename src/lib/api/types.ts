// CTO-Level API Types

// Price Aggregator Types
export interface PriceData {
  symbol: string;
  price: number;
  source: string;
  timestamp: number;
  confidence: number;
}

export interface AggregatedPrice {
  symbol: string;
  price: number;
  sources: number;
  confidence: number;
  lastUpdated: number;
  priceChange24h?: number;
  volume24h?: number;
}

// Socket.tech API Types
export interface SocketRoute {
  routeId: string;
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromAmount: string;
  toAmount: string;
  userTxs: SocketUserTx[];
  serviceTime: number;
  maxServiceTime: number;
  bridgeRoute: boolean;
  gasFees: {
    amount: string;
    amountInUsd: number;
    token: {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      icon: string;
      chainId: number;
    };
  };
}

export interface SocketUserTx {
  userTxType: string;
  txType: string;
  txData: {
    to: string;
    data: string;
    value: string;
    gasLimit: string;
  };
  txTarget: string;
  chainId: number;
  value: string;
  userTxIndex: number;
}

// Portfolio Types
export interface TokenBalance {
  tokenAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  balanceFormatted: string;
  priceUsd: number;
  valueUsd: number;
  chainId: number;
  logoURI?: string;
}

export interface PortfolioData {
  totalValueUsd: number;
  tokens: TokenBalance[];
  chains: {
    chainId: number;
    chainName: string;
    totalValueUsd: number;
    tokenCount: number;
  }[];
  lastUpdated: string;
}

// Transaction Types
export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  blockNumber: number;
  blockHash: string;
  timestamp: number;
  chainId: number;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'send' | 'receive' | 'bridge' | 'swap';
  tokenTransfers?: TokenTransfer[];
}

export interface TokenTransfer {
  tokenAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  value: string;
  from: string;
  to: string;
  logoURI?: string;
}

// Bridge Types
export interface BridgeQuote {
  routeId: string;
  fromChainId: number;
  toChainId: number;
  fromToken: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
  };
  toToken: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
  };
  fromAmount: string;
  toAmount: string;
  userTxs?: SocketUserTx[];
  gasFees: {
    amount: string;
    amountInUsd: number;
    token: {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      icon: string;
      chainId: number;
    };
  };
  serviceTime: number;
  maxServiceTime: number;
  bridgeRoute: boolean;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
}

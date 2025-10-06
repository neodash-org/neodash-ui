// API Response Types

// CoinGecko API Types
export interface CoinGeckoPrice {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CoinGeckoMarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
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

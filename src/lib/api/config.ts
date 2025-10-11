// API Configuration
export const API_CONFIG = {
  // CoinGecko API
  COINGECKO: {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
    RATE_LIMIT: 50, // requests per minute
  },

  // Socket.tech API for bridges
  SOCKET: {
    BASE_URL: 'https://api.socket.tech/v2',
    API_KEY: process.env.NEXT_PUBLIC_SOCKET_API_KEY,
  },

  // Alchemy API for EVM chains (RPC + Portfolio)
  ALCHEMY: {
    BASE_URL: 'https://eth-mainnet.g.alchemy.com/v2',
    API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },

  // Helius API for Solana (RPC + Portfolio)
  HELIUS: {
    BASE_URL: 'https://api.helius.xyz/v0',
    API_KEY: process.env.NEXT_PUBLIC_HELIUS_API_KEY,
  },

  // Request timeouts
  TIMEOUTS: {
    DEFAULT: 10000, // 10 seconds
    PRICE_FEED: 5000, // 5 seconds
    BRIDGE: 30000, // 30 seconds
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 second
    BACKOFF_FACTOR: 2,
  },
} as const;

export type ApiConfig = typeof API_CONFIG;

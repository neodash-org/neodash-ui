# NeoDash API Integration

This directory contains all API integrations for fetching real data in NeoDash.

## 🚀 Quick Start

### 1. Set up Environment Variables

Copy `env_sample` to `.env.local` and add your API keys:

```bash
cp env_sample .env.local
```

Then add your API keys:

```env
# CoinGecko API (Free tier: 50 calls/minute)
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key_here

# Socket.tech API (Free tier: 1000 calls/month)
NEXT_PUBLIC_SOCKET_API_KEY=your_socket_api_key_here

# Moralis API (Free tier: 100,000 calls/month)
NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key_here

# Alchemy API (Free tier: 300M compute units/month)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here

# Helius API (Free tier: 100,000 credits/month)
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key_here
```

### 2. Get API Keys

#### CoinGecko API

- **Free Tier**: 50 calls/minute
- **Sign up**: https://www.coingecko.com/en/api
- **Use case**: Price data, market data, historical data

#### Socket.tech API

- **Free Tier**: 1,000 calls/month
- **Sign up**: https://docs.socket.tech/
- **Use case**: Bridge quotes, supported chains/tokens

#### Moralis API

- **Free Tier**: 100,000 calls/month
- **Sign up**: https://moralis.io/
- **Use case**: EVM portfolio data, transaction history

#### Alchemy API

- **Free Tier**: 300M compute units/month
- **Sign up**: https://www.alchemy.com/
- **Use case**: Ethereum data, enhanced APIs

#### Helius API

- **Free Tier**: 100,000 credits/month
- **Sign up**: https://helius.xyz/
- **Use case**: Solana portfolio data, transaction history

### 3. Use the Hooks

```tsx
import { usePrices, usePortfolio, useBridgeQuote } from '@/hooks/useApi';

function MyComponent() {
  // Fetch cryptocurrency prices
  const { prices, loading, error } = usePrices(['bitcoin', 'ethereum', 'solana']);

  // Fetch portfolio data
  const { portfolio } = usePortfolio(evmAddress, solanaAddress);

  // Get bridge quote
  const { quote, getQuote } = useBridgeQuote();

  return (
    <div>
      {prices.map((coin) => (
        <div key={coin.id}>
          {coin.name}: ${coin.current_price}
        </div>
      ))}
    </div>
  );
}
```

## 📁 File Structure

```
src/lib/api/
├── README.md                 # This file
├── index.ts                  # Main exports
├── config.ts                 # API configuration
├── client.ts                 # HTTP client with retry logic
├── types.ts                  # TypeScript types
└── services/
    ├── index.ts              # Service exports
    ├── coingecko.ts          # CoinGecko API service
    ├── socket.ts             # Socket.tech API service
    └── portfolio.ts          # Portfolio data service
```

## 🔧 API Services

### CoinGeckoService

- `getPrices(coinIds)` - Get current prices for multiple coins
- `getPrice(coinId)` - Get price for a single coin
- `getHistoricalData(coinId, days)` - Get historical market data
- `getTrending()` - Get trending coins
- `getGlobalMarketData()` - Get global market statistics

### SocketService

- `getBridgeQuote(...)` - Get bridge quote between chains
- `getSupportedChains()` - Get list of supported chains
- `getSupportedTokens(chainId)` - Get supported tokens for a chain
- `getBridgeStatus(routeId)` - Check bridge transaction status
- `getBridgeHistory(userAddress)` - Get user's bridge history

### PortfolioService

- `getEvmPortfolio(address, chainIds)` - Get EVM portfolio data
- `getSolanaPortfolio(address)` - Get Solana portfolio data
- `getCombinedPortfolio(evmAddress, solanaAddress)` - Get combined portfolio
- `getTransactionHistory(address, chainIds)` - Get transaction history

## 🎣 React Hooks

### usePrices(coinIds, refreshInterval)

Fetch cryptocurrency prices with automatic refresh.

### usePrice(coinId, refreshInterval)

Fetch single coin price with automatic refresh.

### usePortfolio(evmAddress, solanaAddress, refreshInterval)

Fetch combined portfolio data from EVM and Solana.

### useBridgeQuote()

Get bridge quotes between different chains.

### useTransactionHistory(address, chainIds, limit)

Fetch transaction history for an address.

### useSupportedChains()

Get list of supported chains for bridging.

### useSupportedTokens(chainId)

Get supported tokens for a specific chain.

## 🔄 Error Handling

All API calls include:

- **Retry logic**: 3 attempts with exponential backoff
- **Timeout handling**: Configurable timeouts per API
- **Error boundaries**: Graceful error handling
- **Rate limiting**: Built-in rate limiting protection

## 📊 Rate Limits

| API         | Free Tier                | Paid Tier          |
| ----------- | ------------------------ | ------------------ |
| CoinGecko   | 50 calls/min             | 1000 calls/min     |
| Socket.tech | 1,000 calls/month        | 10,000 calls/month |
| Moralis     | 100,000 calls/month      | 1M+ calls/month    |
| Alchemy     | 300M compute units/month | Custom             |
| Helius      | 100,000 credits/month    | Custom             |

## 🚨 Best Practices

1. **Use React hooks** for automatic state management
2. **Implement proper loading states** in your components
3. **Handle errors gracefully** with user-friendly messages
4. **Cache data appropriately** to avoid unnecessary API calls
5. **Respect rate limits** and implement proper throttling
6. **Use TypeScript** for type safety

## 🧪 Testing

```bash
# Run API tests
npm test src/lib/api/

# Run specific service tests
npm test src/lib/api/services/coingecko.test.ts
```

## 📈 Monitoring

All API calls are automatically tracked with:

- **PostHog analytics** for usage metrics
- **Sentry error tracking** for API failures
- **Performance monitoring** for response times

## 🔐 Security

- API keys are stored in environment variables
- No sensitive data is logged
- All requests include proper authentication
- Rate limiting prevents abuse
- Error messages don't expose sensitive information

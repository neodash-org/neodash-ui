# Data Sources & API Documentation

This document contains all external data sources, APIs, and integrations used in NeoDash.

## 📡 External APIs

### 🌉 Bridge API - Socket/Bungee

**Purpose**: Cross-chain token bridging and swaps

**Documentation**: https://docs.bungee.exchange/bungee-legacy/socket-api/introduction

**API Endpoint**: `https://api.socket.tech/v2`

**Authentication**: Bearer Token (API Key required)

**Key Endpoints** (Verified):

- ✅ `GET /quote` - Get bridge/swap quotes
- ✅ `GET /supported/chains` - List supported chains
- ✅ `GET /supported/bridges` - List supported bridge protocols
- ✅ `GET /token-lists/{chainId}` - Get token lists per chain
- ✅ `POST /build-tx` - Build transaction for execution
- ⚠️ `GET /bridge/status/{routeId}` - Bridge status (not officially documented)
- ⚠️ `GET /bridge/history` - User transaction history (not officially documented)

**Implementation**: `src/lib/api/services/socket.ts`

**Environment Variable**: `NEXT_PUBLIC_SOCKET_API_KEY`

**Notes**:

- Socket API is now part of Bungee (legacy documentation still valid)
- Supports both cross-chain and same-chain swaps
- Public test API key available: `72a5b4b0-e727-48be-8aa1-5da9d62fe635`
- Bridge slippage configurable 0-100%
- API uptime status: Check Bungee docs for status page

**Endpoint Verification Status**:

- ✅ Fixed: Changed `/supported/tokens` to `/token-lists/{chainId}` (verified)
- ⚠️ To verify: `/bridge/status/{routeId}` - not found in official docs
- ⚠️ To verify: `/bridge/history` - not found in official docs
- 💡 Alternative: Use the new Bungee Auto API for better status tracking if needed

---

### 💰 Price Aggregator (Custom)

**Purpose**: Multi-source cryptocurrency price aggregation

**Implementation**: `src/lib/api/services/priceAggregator.ts`

**Data Sources**:

1. **Binance** - `https://api.binance.com/api/v3/ticker/24hr`
2. **Coinbase** - `https://api.coinbase.com/v2/exchange-rates`
3. **CryptoCompare** - `https://min-api.cryptocompare.com/data/pricemulti`
4. **CoinPaprika** - `https://api.coinpaprika.com/v1/tickers`

**Features**:

- Weighted average pricing from multiple sources
- 5-minute client-side caching
- Confidence scoring based on source agreement
- Automatic fallback to mock data if APIs fail
- Rate limiting and retry logic

**Environment Variables**: None required (all free APIs)

---

### 📊 Portfolio Data

**Providers**:

#### Alchemy (EVM Chains)

- **Purpose**: Multi-chain portfolio data, token balances, NFTs, transaction history
- **Docs**: https://docs.alchemy.com/
- **Environment Variable**: `NEXT_PUBLIC_ALCHEMY_API_KEY`
- **Supported Chains**: Ethereum, Polygon, Arbitrum, Optimism, Base, Sepolia
- **Key Features**:
  - `alchemy_getTokenBalances` - Get all ERC20 token balances
  - `alchemy_getTokenMetadata` - Token info (name, symbol, decimals, logo)
  - `alchemy_getAssetTransfers` - Transaction history with metadata
  - `alchemy_getNFTs` - NFT portfolio

#### Helius (Solana)

- **Purpose**: Solana-specific data, transactions, NFTs
- **Docs**: https://docs.helius.dev/
- **Environment Variable**: `NEXT_PUBLIC_HELIUS_API_KEY`
- **Key Features**:
  - Account balances (SOL + SPL tokens)
  - Transaction history
  - NFT metadata
  - Compressed NFT support

---

## 🔗 Blockchain RPC Providers

### Alchemy (EVM)

- **Networks**: Ethereum, Polygon, Arbitrum, Optimism, Base, Sepolia
- **Setup**: Configured in wagmi config
- **Environment Variable**: `NEXT_PUBLIC_ALCHEMY_API_KEY`
- **Usage**: Both RPC transactions AND portfolio data (all-in-one!)
- **Free Tier**: 300M compute units/month

### Helius (Solana)

- **Networks**: Solana Mainnet, Devnet, Testnet
- **Setup**: Configured in Solana wallet adapter
- **Environment Variable**: `NEXT_PUBLIC_HELIUS_API_KEY`
- **Usage**: Both RPC transactions AND portfolio data (all-in-one!)
- **Free Tier**: 100,000 credits/month

---

## 🔐 Authentication & Analytics

### PostHog

- **Purpose**: Product analytics, feature flags, session replay
- **Docs**: https://posthog.com/docs
- **Environment Variable**: `NEXT_PUBLIC_POSTHOG_KEY`
- **Host**: `NEXT_PUBLIC_POSTHOG_HOST`

### Sentry

- **Purpose**: Error tracking and performance monitoring
- **Docs**: https://docs.sentry.io/
- **Environment Variable**: `SENTRY_DSN`
- **Organization**: `SENTRY_ORG`, `SENTRY_PROJECT`

---

## 📝 Implementation Notes

### API Key Management

- All API keys stored in `.env.local` (not committed to git)
- Sample configuration in `env_sample`
- Use `NEXT_PUBLIC_*` prefix for client-side accessible keys

### Rate Limiting

- Price aggregator: Built-in client-side caching (5 min TTL)
- Socket API: Subject to API key tier limits
- RPC providers: Depends on plan tier

### Error Handling

- All API services implement retry logic
- Graceful degradation with fallback mock data
- Centralized error tracking via Sentry

### Testing

- Use public test API keys for development
- Mock data available for offline development
- Integration tests in `src/lib/api/__tests__/`

---

## 🔄 API Updates & Versioning

### Socket/Bungee API

- Current version: v2
- Legacy docs maintained at Bungee
- Monitor deprecation notices

### Price APIs

- All using stable public endpoints
- No versioning required
- Fallback mechanisms in place

---

## 📚 Additional Resources

- **Socket Protocol (New)**: https://docs.socket.tech/ (Not currently used - chain abstraction protocol)
- **Bungee Bridge UI**: https://bungee.exchange/ (User-facing bridge)
- **Socket GitHub**: https://github.com/SocketDotTech

---

**Last Updated**: 2025-10-30

---

## 🌉 Bridge Flow & Hooks

### Overview

The Bridge feature uses Socket/Bungee for cross-chain quotes and transaction building. The UI composes controlled inputs for chain, token and amount, and derives a quote summary. Execution is disabled until a wallet is connected and a valid quote is available.

### Hook Surfaces (Agent 1/2/3)

These hooks are consumed by the Bridge page and components. Exact signatures may evolve, but the responsibilities and data shapes remain stable.

- useBridgeState (source of truth for bridge UI state)
  - Inputs: optional URL params to prefill
  - State: fromChainId, toChainId, fromToken, toToken, amount, userAddress
  - Derived: isValid, parsedAmount, validationErrors
  - Effects: sync userAddress and fromChainId with connected EVM wallet (wagmi)

- useSupportedLists
  - Methods: loadSupportedChains(), loadTokenList(chainId)
  - Caching: in-memory 10m TTL, request dedupe by key

- useBridgeQuote
  - Inputs: fromChainId, toChainId, fromToken, toToken, amount, userAddress
  - Output: quote, loading, error, refetch
  - Behavior: debounced fetch, cancels stale requests, error surfaced via centralized handler

- useExecuteRoute
  - Inputs: quote
  - Output: buildTx(), execute(), txStatus

Environment

- NEXT_PUBLIC_SOCKET_API_KEY (required)
- Reads from src/lib/api/config.ts at build/runtime; ensure .env.local is configured

Testing

- Use /test-bridge for inspection of raw state and quotes
- /bridge is production UI; keep both routable during development

Pricing (Agent 4)

- USD values computed via aggregated prices with fallback to quote-provided USD
- Memoized lookups to avoid unnecessary renders

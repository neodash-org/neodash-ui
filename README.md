# neodash-ui

Frontend interface for NeoDash – a multichain, multiwallet Web3 dashboard.

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Configure environment

Copy `env_sample` to `.env.local` and fill in the values:

```bash
cp env_sample .env.local
```

Required for Bridge and Wallet features:

- `NEXT_PUBLIC_SOCKET_API_KEY` – Socket/Bungee API key (free tier OK)
- `NEXT_PUBLIC_ALCHEMY_API_KEY` – EVM RPC + portfolio
- `NEXT_PUBLIC_HELIUS_API_KEY` – Solana RPC + portfolio

Notes:

- Socket docs: `https://docs.bungee.exchange/bungee-legacy/socket-api/introduction`
- The app reads `NEXT_PUBLIC_SOCKET_API_KEY` from `src/lib/api/config.ts`

3. Run the dev server

```bash
pnpm dev
```

App will be available at `http://localhost:3000`.

## Bridge

Production Bridge UI: `/bridge`

Debug/Test Bridge UI: `/test-bridge` (shows raw state/quote details helpful for debugging)

Behavior:

- Loads supported chains/tokens from Socket
- Uses connected EVM wallet to autofill `userAddress` and `fromChainId`
- Execute is disabled until a wallet is connected AND a valid quote is present

URL Prefill:

- `/bridge?fromChainId=1&toChainId=137&fromToken=ETH&toToken=USDC&amount=0.1`

Testing locally:

1. Ensure `.env.local` contains `NEXT_PUBLIC_SOCKET_API_KEY`
2. Start the dev server
3. Visit `/bridge` and/or `/test-bridge`
4. Connect an EVM wallet (RainbowKit/wagmi)
5. Change networks; `fromChainId` should update automatically

## Scripts

```bash
pnpm dev        # start next dev server
pnpm build      # build
pnpm start      # start production server
pnpm test       # run unit tests (vitest)
pnpm test:e2e   # run e2e tests (playwright)
pnpm lint       # run eslint
```

## Documentation

See `designs/data-sources.md` for API integrations, environment variables, and the Bridge flow & hooks overview.

'use client';

import React from 'react';
import { usePrices, usePortfolio, useBridgeQuote, useTransactionHistory } from '@/hooks/useApi';
import { Card } from '@/design-system/components';

// Example component showing how to use the API integration
export const ApiIntegrationExample: React.FC = () => {
  // Example: Fetch prices for popular cryptocurrencies
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
  } = usePrices(['bitcoin', 'ethereum', 'solana', 'polygon']);

  // Example: Fetch portfolio data (you would get these from wallet context)
  const {
    portfolio,
    loading: portfolioLoading,
    error: portfolioError,
  } = usePortfolio(
    '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Example EVM address
    '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM', // Example Solana address
  );

  // Example: Bridge quote hook (call getQuote when needed)
  const { quote, loading: quoteLoading, error: quoteError, getQuote } = useBridgeQuote();

  // Example: Transaction history
  const {
    transactions,
    loading: txLoading,
    error: txError,
  } = useTransactionHistory('0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6');

  const handleGetBridgeQuote = () => {
    getQuote(
      1, // Ethereum
      137, // Polygon
      '0xA0b86a33E6441c8C06DDD5e7A0e0C8C0C0C0C0C0', // USDC
      '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC on Polygon
      '1000000', // 1 USDC (6 decimals)
      '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // User address
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Integration Examples</h2>

      {/* Price Data */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Cryptocurrency Prices</h3>
        {pricesLoading && <p>Loading prices...</p>}
        {pricesError && <p className="text-red-500">Error: {pricesError}</p>}
        {prices.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {prices.map((coin) => (
              <div key={coin.id} className="flex items-center space-x-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <p className="font-medium">{coin.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${coin.current_price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Portfolio Data */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Portfolio Data</h3>
        {portfolioLoading && <p>Loading portfolio...</p>}
        {portfolioError && <p className="text-red-500">Error: {portfolioError}</p>}
        {portfolio && (
          <div>
            <p className="text-2xl font-bold">Total Value: ${portfolio.totalValueUsd.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {portfolio.tokens.length} tokens across {portfolio.chains.length} chains
            </p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Chains:</h4>
              <div className="space-y-2">
                {portfolio.chains.map((chain) => (
                  <div key={chain.chainId} className="flex justify-between">
                    <span>{chain.chainName}</span>
                    <span>${chain.totalValueUsd.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Bridge Quote */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Bridge Quote</h3>
        <button
          onClick={handleGetBridgeQuote}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={quoteLoading}
        >
          {quoteLoading ? 'Getting Quote...' : 'Get Bridge Quote'}
        </button>
        {quoteError && <p className="text-red-500 mt-2">Error: {quoteError}</p>}
        {quote && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p>Route ID: {quote.routeId}</p>
            <p>
              From: {quote.fromAmount} {quote.fromToken.symbol}
            </p>
            <p>
              To: {quote.toAmount} {quote.toToken.symbol}
            </p>
            <p>
              Gas Fees: {quote.gasFees.amount} {quote.gasFees.token.symbol}
            </p>
            <p>Service Time: {quote.serviceTime}s</p>
          </div>
        )}
      </Card>

      {/* Transaction History */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        {txLoading && <p>Loading transactions...</p>}
        {txError && <p className="text-red-500">Error: {txError}</p>}
        {transactions.length > 0 && (
          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.hash}
                className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded"
              >
                <div>
                  <p className="font-mono text-sm">{tx.hash.slice(0, 10)}...</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {new Date(tx.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{tx.value} ETH</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

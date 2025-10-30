/**
 * CTO-Level Price Aggregator Example
 *
 * Demonstrates:
 * - Multi-source price aggregation
 * - Real-time price updates
 * - Trending coins
 * - Error handling
 * - Loading states
 */

'use client';

import React from 'react';
import { usePrices, usePrice, useTrendingCoins } from '@/hooks/useApi';
// Using basic HTML elements for now - can be replaced with your UI components
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

export function PriceAggregatorExample() {
  console.log('🎨 PriceAggregatorExample component rendering');

  // Example: Get prices for multiple coins
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
    refetch: refetchPrices,
  } = usePrices(['BTC', 'ETH', 'SOL']);

  console.log('📊 Component state:', {
    prices,
    pricesLoading,
    pricesError,
    pricesKeys: Object.keys(prices),
  });

  // Example: Get single coin with metrics
  const { price: btcPrice, loading: btcLoading, error: btcError } = usePrice('BTC');

  // Example: Get trending coins
  const { trending, loading: trendingLoading, error: trendingError } = useTrendingCoins(5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Price Aggregator Demo</h2>
        <button
          onClick={refetchPrices}
          disabled={pricesLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 inline ${pricesLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Multi-Coin Prices */}
      <div className="border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Multi-Source Price Aggregation</h3>
        </div>
        <div>
          {pricesLoading ? (
            <div className="text-center py-4">Loading prices...</div>
          ) : pricesError ? (
            <div className="text-red-500 text-center py-4">{pricesError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(prices).map(([symbol, priceData]) => (
                <div key={symbol} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{symbol}</h3>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">
                      {priceData.sources} sources
                    </span>
                  </div>
                  <div className="text-2xl font-bold mt-2">
                    $
                    {priceData.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Confidence: {(priceData.confidence * 100).toFixed(0)}%
                  </div>
                  {priceData.priceChange24h && (
                    <div
                      className={`flex items-center mt-2 ${
                        priceData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {priceData.priceChange24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {priceData.priceChange24h.toFixed(2)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Single Coin with Metrics */}
      <div className="border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">BTC Price with 24h Metrics</h3>
        </div>
        <div>
          {btcLoading ? (
            <div className="text-center py-4">Loading BTC data...</div>
          ) : btcError ? (
            <div className="text-red-500 text-center py-4">{btcError}</div>
          ) : btcPrice ? (
            <div className="space-y-4">
              <div className="text-3xl font-bold">
                $
                {btcPrice.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">24h Change</div>
                  <div
                    className={`font-semibold ${
                      (btcPrice.priceChange24h || 0) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {btcPrice.priceChange24h?.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">24h Volume</div>
                  <div className="font-semibold">
                    ${btcPrice.volume24h?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Sources: {btcPrice.sources} | Confidence: {(btcPrice.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ) : (
            <div className="text-center py-4">No BTC data available</div>
          )}
        </div>
      </div>

      {/* Trending Coins */}
      <div className="border rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Trending Coins (Top Movers)</h3>
        </div>
        <div>
          {trendingLoading ? (
            <div className="text-center py-4">Loading trending coins...</div>
          ) : trendingError ? (
            <div className="text-red-500 text-center py-4">{trendingError}</div>
          ) : (
            <div className="space-y-3">
              {trending.map((coin, index) => (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{coin.symbol}</div>
                      <div className="text-sm text-gray-500">
                        {coin.sources} sources • {(coin.confidence * 100).toFixed(0)}% confidence
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      $
                      {coin.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    {coin.priceChange24h && (
                      <div
                        className={`text-sm ${
                          coin.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {coin.priceChange24h >= 0 ? '+' : ''}
                        {coin.priceChange24h.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

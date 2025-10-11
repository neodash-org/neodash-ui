'use client';

import React, { useState } from 'react';
import { useBridgeQuote, useSupportedChains, useSupportedTokens } from '@/hooks/useApi';

export default function TestBridgePage() {
  const [fromChainId, setFromChainId] = useState<number>(1); // Ethereum
  const [toChainId, setToChainId] = useState<number>(137); // Polygon
  const [amount, setAmount] = useState<string>('100');
  const [userAddress] = useState<string>('0x0000000000000000000000000000000000000000'); // Dummy address for testing

  const { chains, loading: chainsLoading, error: chainsError } = useSupportedChains();
  const { tokens: fromTokens, loading: fromTokensLoading } = useSupportedTokens(fromChainId);
  const { tokens: toTokens, loading: toTokensLoading } = useSupportedTokens(toChainId);
  const { quote, loading: quoteLoading, error: quoteError, getQuote } = useBridgeQuote();

  const [fromTokenAddress, setFromTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // Native ETH
  );
  const [toTokenAddress, setToTokenAddress] = useState<string>(
    '0x0000000000000000000000000000000000001010', // Native MATIC
  );

  const handleGetQuote = async () => {
    if (!fromChainId || !toChainId || !fromTokenAddress || !toTokenAddress || !amount) {
      alert('Please fill all fields');
      return;
    }

    await getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-neon-cyan">🌉 Socket Bridge Quote Tester</h1>

        {/* Chains Section */}
        <div className="bg-gray-800/50 border border-neon-cyan/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-neon-cyan">
            Supported Chains {chainsLoading && '(Loading...)'}
          </h2>
          {chainsError && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-300">Error loading chains: {chainsError}</p>
            </div>
          )}
          {chains.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {chains.slice(0, 10).map((chain) => (
                <div key={chain.chainId} className="text-sm text-gray-300">
                  • {chain.name} (ID: {chain.chainId})
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-400 mt-2">Total: {chains.length} chains</p>
        </div>

        {/* Bridge Quote Form */}
        <div className="bg-gray-800/50 border border-neon-cyan/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-neon-cyan">Get Bridge Quote</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* From Chain */}
            <div>
              <label className="block text-sm font-medium mb-2">From Chain</label>
              <select
                value={fromChainId}
                onChange={(e) => setFromChainId(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              >
                {chains.map((chain) => (
                  <option key={chain.chainId} value={chain.chainId}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To Chain */}
            <div>
              <label className="block text-sm font-medium mb-2">To Chain</label>
              <select
                value={toChainId}
                onChange={(e) => setToChainId(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              >
                {chains.map((chain) => (
                  <option key={chain.chainId} value={chain.chainId}>
                    {chain.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* From Token */}
            <div>
              <label className="block text-sm font-medium mb-2">
                From Token {fromTokensLoading && '(Loading...)'}
              </label>
              <select
                value={fromTokenAddress}
                onChange={(e) => setFromTokenAddress(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={fromTokensLoading}
              >
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">
                  Native Token (ETH/MATIC/etc)
                </option>
                {fromTokens.slice(0, 20).map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>

            {/* To Token */}
            <div>
              <label className="block text-sm font-medium mb-2">
                To Token {toTokensLoading && '(Loading...)'}
              </label>
              <select
                value={toTokenAddress}
                onChange={(e) => setToTokenAddress(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={toTokensLoading}
              >
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">
                  Native Token (ETH/MATIC/etc)
                </option>
                {toTokens.slice(0, 20).map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount (in smallest unit)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
            />
            <p className="text-xs text-gray-400 mt-1">
              Example: 100 for 0.0000000000000001 ETH (wei), or 1000000000000000000 for 1 ETH
            </p>
          </div>

          {/* Get Quote Button */}
          <button
            onClick={handleGetQuote}
            disabled={quoteLoading}
            className="w-full bg-neon-cyan text-black font-semibold py-3 rounded-lg hover:bg-neon-cyan/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {quoteLoading ? 'Loading Quote...' : 'Get Quote'}
          </button>
        </div>

        {/* Quote Error */}
        {quoteError && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
            <p className="text-sm text-red-300">{quoteError}</p>
          </div>
        )}

        {/* Quote Result */}
        {quote && (
          <div className="bg-green-900/20 border border-neon-cyan/50 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-neon-cyan mb-4">Bridge Quote</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Route ID:</span>
                <span className="font-mono text-sm">{quote.routeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">From Chain:</span>
                <span>{quote.fromChainId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To Chain:</span>
                <span>{quote.toChainId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">From Amount:</span>
                <span className="font-mono">{quote.fromAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">To Amount:</span>
                <span className="font-mono text-neon-cyan">{quote.toAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gas Fees:</span>
                <span>
                  {quote.gasFees.amount} {quote.gasFees.token.symbol} ($
                  {quote.gasFees.amountInUsd.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service Time:</span>
                <span>
                  {quote.serviceTime}s (max: {quote.maxServiceTime}s)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bridge Route:</span>
                <span>{quote.bridgeRoute ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>

            {/* Token Details */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded p-3">
                <h4 className="font-semibold mb-2">From Token</h4>
                <p className="text-sm">{quote.fromToken.name}</p>
                <p className="text-xs text-gray-400">{quote.fromToken.symbol}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-3">
                <h4 className="font-semibold mb-2">To Token</h4>
                <p className="text-sm">{quote.toToken.name}</p>
                <p className="text-xs text-gray-400">{quote.toToken.symbol}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">📝 Test Instructions</h3>
          <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
            <li>Select source chain (e.g., Ethereum - Chain ID 1)</li>
            <li>Select destination chain (e.g., Polygon - Chain ID 137)</li>
            <li>Select tokens (or use native tokens)</li>
            <li>
              Enter amount in smallest unit (wei):
              <ul className="ml-6 mt-1 text-xs text-gray-400 list-disc list-inside">
                <li>1000000000000000000 = 1 ETH</li>
                <li>100000000000000000 = 0.1 ETH</li>
                <li>10000000000000000 = 0.01 ETH</li>
              </ul>
            </li>
            <li>Click &quot;Get Quote&quot; to see the bridge estimate</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

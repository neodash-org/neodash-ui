'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useBridgeQuote, useSupportedChains, useSupportedTokens } from '@/hooks/useApi';
import { useBridgeWalletDefaults } from '@/hooks/bridge';
import { WalletConnectButton } from '@/components/wallet/connect-button';
import { Skeleton, SkeletonRows } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export default function BridgePage() {
  const { fromChainId, setFromChainId, userAddress, isConnected } = useBridgeWalletDefaults(1);
  const [toChainId, setToChainId] = useState<number>(137);
  const [amount, setAmount] = useState<string>('1000000000000000');

  const {
    chains,
    loading: chainsLoading,
    error: chainsError,
    refetch: refetchChains,
  } = useSupportedChains();
  const {
    tokens: fromTokens,
    loading: fromTokensLoading,
    error: fromTokensError,
    refetch: refetchFromTokens,
  } = useSupportedTokens(fromChainId);
  const {
    tokens: toTokens,
    loading: toTokensLoading,
    error: toTokensError,
    refetch: refetchToTokens,
  } = useSupportedTokens(toChainId);
  const { quote, loading: quoteLoading, error: quoteError, getQuote } = useBridgeQuote();

  // Defaults for native tokens
  const [fromTokenAddress, setFromTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  );
  const [toTokenAddress, setToTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  );

  useEffect(() => {
    // Ensure native defaults remain selected when chain changes
    setFromTokenAddress('0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  }, [fromChainId]);

  const canQuote = useMemo(() => {
    return (
      !!fromChainId &&
      !!toChainId &&
      !!fromTokenAddress &&
      !!toTokenAddress &&
      amount.length > 0 &&
      userAddress.length > 0
    );
  }, [fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress]);

  const handleQuote = async () => {
    if (!canQuote) return;
    await getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-neon-cyan mb-6 tracking-wide">Bridge</h1>

        {/* Chains */}
        <div className="bg-gray-800/50 border border-neon-cyan/30 rounded-lg p-6 mb-6">
          <h2 className="text-2xl text-neon-cyan mb-4">Supported Chains</h2>
          {chainsLoading && <SkeletonRows count={6} />}
          {!chainsLoading && chainsError && (
            <ErrorState title="Error loading chains" onRetry={refetchChains} />
          )}
          {!chainsLoading && !chainsError && chains.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {chains.slice(0, 10).map((chain) => (
                <div key={chain.chainId} className="text-sm text-gray-300">
                  • {chain.name} (ID: {chain.chainId})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 border border-neon-cyan/30 rounded-lg p-6 mb-6">
          {!isConnected && (
            <div className="mb-4">
              <WalletConnectButton />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">From Chain</label>
              <select
                value={fromChainId}
                onChange={(e) => setFromChainId(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={chainsLoading}
              >
                {chains.map((chain) => (
                  <option key={chain.chainId} value={chain.chainId}>
                    {chain.name}
                  </option>
                ))}
              </select>
              {fromTokensError && (
                <div className="mt-2">
                  <ErrorState title="Error loading tokens" onRetry={refetchFromTokens} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">To Chain</label>
              <select
                value={toChainId}
                onChange={(e) => setToChainId(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={chainsLoading}
              >
                {chains.map((chain) => (
                  <option key={chain.chainId} value={chain.chainId}>
                    {chain.name}
                  </option>
                ))}
              </select>
              {toTokensError && (
                <div className="mt-2">
                  <ErrorState title="Error loading tokens" onRetry={refetchToTokens} />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-2">From Token</label>
              {fromTokensLoading && <Skeleton height={36} />}
              <select
                value={fromTokenAddress}
                onChange={(e) => setFromTokenAddress(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={fromTokensLoading}
              >
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">Native</option>
                {fromTokens.slice(0, 40).map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">To Token</label>
              {toTokensLoading && <Skeleton height={36} />}
              <select
                value={toTokenAddress}
                onChange={(e) => setToTokenAddress(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                disabled={toTokensLoading}
              >
                <option value="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee">Native</option>
                {toTokens.slice(0, 40).map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.symbol} - {token.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Amount (smallest unit)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="1000000000000000"
            />
          </div>

          <button
            onClick={handleQuote}
            disabled={quoteLoading || !canQuote}
            className="w-full bg-neon-cyan text-black py-3 rounded-lg disabled:opacity-50"
          >
            {quoteLoading ? 'Loading Quote...' : 'Get Quote'}
          </button>
        </div>

        {quoteError && <ErrorState title="Failed to get quote" />}

        {quote && (
          <div className="bg-green-900/20 border border-neon-cyan/50 rounded-lg p-6">
            <h3 className="text-2xl text-neon-cyan mb-4">Bridge Quote</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Route ID</span>
                <span className="font-mono">{quote.routeId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">From Amount</span>
                <span className="font-mono">{quote.fromAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">To Amount</span>
                <span className="font-mono text-neon-cyan">{quote.toAmount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/src/design-system/components/Button';
import { Card } from '@/src/design-system/components/Card';
import { Separator } from '@/src/design-system/components/Separator';
import { useBridgeQuote, useSupportedChains, useSupportedTokens } from '@/src/hooks/useApi';
import ChainSelect from '@/src/components/bridge/ChainSelect';
import TokenSelect from '@/src/components/bridge/TokenSelect';
import AmountInput from '@/src/components/bridge/AmountInput';
import QuoteSummary from '@/src/components/bridge/QuoteSummary';

export default function BridgePage() {
  const { address, isConnected } = useAccount();

  const [fromChainId, setFromChainId] = useState<number>(1);
  const [toChainId, setToChainId] = useState<number>(137);
  const [fromTokenAddress, setFromTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  );
  const [toTokenAddress, setToTokenAddress] = useState<string>(
    '0x0000000000000000000000000000000000001010',
  );
  const [amount, setAmount] = useState<string>('');

  const { chains, loading: chainsLoading } = useSupportedChains();
  const { tokens: fromTokens, loading: fromTokensLoading } = useSupportedTokens(fromChainId);
  const { tokens: toTokens, loading: toTokensLoading } = useSupportedTokens(toChainId);
  const { quote, loading: quoteLoading, error: quoteError, getQuote } = useBridgeQuote();

  const canRequestQuote = useMemo(() => {
    return Boolean(
      fromChainId &&
        toChainId &&
        fromTokenAddress &&
        toTokenAddress &&
        Number(amount) > 0 &&
        address,
    );
  }, [fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, address]);

  const handleGetQuote = useCallback(async () => {
    if (!canRequestQuote || !address) return;
    await getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, address);
  }, [
    canRequestQuote,
    address,
    getQuote,
    fromChainId,
    toChainId,
    fromTokenAddress,
    toTokenAddress,
    amount,
  ]);

  const isLoading = chainsLoading || fromTokensLoading || toTokensLoading;

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Bridge</h1>
      <Card>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ChainSelect
                label="From chain"
                chains={chains}
                value={fromChainId}
                onChange={setFromChainId}
                loading={isLoading}
              />
              <ChainSelect
                label="To chain"
                chains={chains}
                value={toChainId}
                onChange={setToChainId}
                loading={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TokenSelect
                label="From token"
                tokens={fromTokens}
                value={fromTokenAddress}
                onChange={setFromTokenAddress}
                loading={fromTokensLoading}
              />
              <TokenSelect
                label="To token"
                tokens={toTokens}
                value={toTokenAddress}
                onChange={setToTokenAddress}
                loading={toTokensLoading}
              />
            </div>

            <AmountInput value={amount} onChange={setAmount} disabled={isLoading} />

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleGetQuote}
                disabled={!isConnected || !canRequestQuote || quoteLoading}
              >
                {quoteLoading ? 'Fetching quote…' : 'Get Quote'}
              </Button>
              <span className="text-sm text-muted-foreground">
                {isConnected
                  ? `Connected: ${address?.slice(0, 6)}…${address?.slice(-4)}`
                  : 'Connect wallet to request a quote'}
              </span>
            </div>

            <Separator />

            <QuoteSummary quote={quote} error={quoteError} loading={quoteLoading} />
          </div>
        </div>
      </Card>
    </div>
  );
}

import React from 'react';

export default function BridgePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col gap-8">
      {/* Bridge Header */}
      <section className="flex flex-col gap-4">
        <h2 className="text-neon-cyan text-2xl font-bold font-[var(--font-cyberpunk)] tracking-wider">
          Bridge
        </h2>
        <p className="text-white/70">Transfer assets between different blockchain networks</p>
      </section>

      {/* Bridge Interface */}
      <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-8">
        {/* Network Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Source Network */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-3">From Network</label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none appearance-none">
                <option>Ethereum (ETH)</option>
                <option>Polygon (MATIC)</option>
                <option>Binance Smart Chain (BSC)</option>
                <option>Arbitrum (ARB)</option>
                <option>Optimism (OP)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Destination Network */}
          <div>
            <label className="block text-white/70 text-sm font-medium mb-3">To Network</label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-cyan focus:outline-none appearance-none">
                <option>Polygon (MATIC)</option>
                <option>Ethereum (ETH)</option>
                <option>Binance Smart Chain (BSC)</option>
                <option>Arbitrum (ARB)</option>
                <option>Optimism (OP)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Selection */}
        <div className="mb-8">
          <label className="block text-white/70 text-sm font-medium mb-3">Asset to Bridge</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:border-neon-cyan/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-neon-yellow rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Ethereum</p>
                <p className="text-white/60 text-sm">ETH</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">12.456</p>
                <p className="text-white/60 text-sm">$18,234.56</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:border-neon-cyan/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 bg-neon-cyan rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-white font-medium">USD Coin</p>
                <p className="text-white/60 text-sm">USDC</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">5,000</p>
                <p className="text-white/60 text-sm">$5,000.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-8">
          <label className="block text-white/70 text-sm font-medium mb-3">Amount to Bridge</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:border-neon-cyan focus:outline-none text-right text-lg"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-white/60">ETH</span>
            </div>
            <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-neon-cyan hover:text-neon-cyan/80 text-sm font-medium">
              MAX
            </button>
          </div>
          <div className="flex justify-between text-sm text-white/60 mt-2">
            <span>Available: 12.456 ETH</span>
            <span>≈ $18,234.56</span>
          </div>
        </div>

        {/* Bridge Details */}
        <div className="bg-white/5 rounded-lg p-4 mb-8">
          <h3 className="text-white font-medium mb-3">Bridge Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Bridge Fee:</span>
              <span className="text-white">0.001 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Estimated Time:</span>
              <span className="text-white">5-10 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">You&apos;ll Receive:</span>
              <span className="text-white">12.455 ETH (Polygon)</span>
            </div>
          </div>
        </div>

        {/* Bridge Button */}
        <button className="w-full px-6 py-4 bg-gradient-to-r from-neon-cyan to-neon-pink text-white rounded-lg hover:scale-105 transition-all duration-300 font-bold font-[var(--font-cyberpunk)] text-lg shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)]">
          Bridge Assets
        </button>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-neon-yellow/10 border border-neon-yellow/20 rounded-lg">
          <div className="flex items-start">
            <span className="text-neon-yellow mr-2">⚠️</span>
            <div className="text-sm text-neon-yellow/80">
              <p className="font-medium mb-1">Security Notice</p>
              <p>
                Always verify the destination address and network before bridging. Bridge
                transactions cannot be reversed once initiated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Bridge Transactions */}
      <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
        <h3 className="text-neon-cyan text-xl font-bold font-[var(--font-cyberpunk)] mb-6 tracking-wide">
          Recent Bridge Transactions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-neon-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">ETH → Polygon</p>
                <p className="text-white/60 text-sm">2.5 ETH • 2 hours ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-neon-green text-sm font-medium">Completed</p>
              <p className="text-white/60 text-xs">Tx: 0x1234...5678</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neon-cyan/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-neon-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">USDC → BSC</p>
                <p className="text-white/60 text-sm">1,000 USDC • 1 day ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-neon-cyan text-sm font-medium">Processing</p>
              <p className="text-white/60 text-xs">Tx: 0xabcd...efgh</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { ErrorState } from '@/components/shared/ErrorState';
import { Skeleton } from '@/components/shared/Skeleton';
import { WalletConnectButton } from '@/components/wallet/connect-button';

export type SelectOption = { chainId: number; name: string };
export type TokenOption = { address: string; symbol: string; name: string };

type BridgeFormProps = {
  isConnected: boolean;
  chains: SelectOption[];
  chainsLoading: boolean;
  fromChainId: number;
  setFromChainId: (id: number) => void;
  toChainId: number;
  setToChainId: (id: number) => void;

  fromTokens: TokenOption[];
  toTokens: TokenOption[];
  fromTokensLoading: boolean;
  toTokensLoading: boolean;
  fromTokensError: string | null;
  toTokensError: string | null;
  refetchFromTokens: () => Promise<void> | void;
  refetchToTokens: () => Promise<void> | void;

  fromTokenAddress: string;
  setFromTokenAddress: (addr: string) => void;
  toTokenAddress: string;
  setToTokenAddress: (addr: string) => void;

  amount: string;
  setAmount: (v: string) => void;

  canQuote: boolean;
  quoteLoading: boolean;
  onQuote: () => void | Promise<void>;
  onExecute: () => void | Promise<void>;
  canExecute: boolean;
};

export function BridgeForm(props: BridgeFormProps) {
  const {
    isConnected,
    chains,
    chainsLoading,
    fromChainId,
    setFromChainId,
    toChainId,
    setToChainId,
    fromTokens,
    toTokens,
    fromTokensLoading,
    toTokensLoading,
    fromTokensError,
    toTokensError,
    refetchFromTokens,
    refetchToTokens,
    fromTokenAddress,
    setFromTokenAddress,
    toTokenAddress,
    setToTokenAddress,
    amount,
    setAmount,
    canQuote,
    quoteLoading,
    onQuote,
    onExecute,
    canExecute,
  } = props;

  return (
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
        onClick={onQuote}
        disabled={quoteLoading || !canQuote}
        className="w-full bg-neon-cyan text-black py-3 rounded-lg disabled:opacity-50"
      >
        {quoteLoading ? 'Loading Quote...' : 'Get Quote'}
      </button>

      <div className="mt-3">
        <button
          onClick={onExecute}
          disabled={!canExecute}
          className="w-full bg-white/10 text-white py-3 rounded-lg disabled:opacity-50"
        >
          Execute via wallet
        </button>
      </div>
    </div>
  );
}

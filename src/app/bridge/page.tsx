'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useBridgeQuote,
  useSupportedChains,
  useSupportedTokens,
  useUsdForSymbol,
} from '@/hooks/useApi';
import { useBridgeWalletDefaults } from '@/hooks/bridge';
//
import { BridgeHeader } from '@/components/bridge/BridgeHeader';
import { SupportedChains } from '@/components/bridge/SupportedChains';
import { BridgeForm } from '@/components/bridge/BridgeForm';
import { QuoteSummary } from '@/components/bridge/QuoteSummary';
import { useToast } from '@/components/shared/Toast';
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi';

export default function BridgePage() {
  const { show } = useToast();
  const searchParams = useSearchParams();
  const { chainId: walletChainId, isConnected: isEvmConnected, address: evmAddress } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
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
  const { quote, loading: quoteLoading, getQuote } = useBridgeQuote();

  // Defaults for native tokens
  const [fromTokenAddress, setFromTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  );
  const [toTokenAddress, setToTokenAddress] = useState<string>(
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  );

  // Prefill from URL query params
  useEffect(() => {
    if (!searchParams) return;
    const fromChain = searchParams.get('fromChainId');
    const toChain = searchParams.get('toChainId');
    const fromToken = searchParams.get('fromTokenAddress');
    const toToken = searchParams.get('toTokenAddress');
    const amt = searchParams.get('amount');

    if (fromChain) setFromChainId(Number(fromChain));
    if (toChain) setToChainId(Number(toChain));
    if (fromToken) setFromTokenAddress(fromToken);
    if (toToken) setToTokenAddress(toToken);
    if (amt) setAmount(amt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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

  // -------------------- USD COMPUTATIONS --------------------
  const selectedFromToken = useMemo(
    () => fromTokens.find((t) => t.address.toLowerCase() === fromTokenAddress.toLowerCase()),
    [fromTokens, fromTokenAddress],
  );
  const selectedToToken = useMemo(
    () => toTokens.find((t) => t.address.toLowerCase() === toTokenAddress.toLowerCase()),
    [toTokens, toTokenAddress],
  );

  const nativeSymbolByChain: Record<number, string> = {
    1: 'ETH',
    10: 'ETH',
    137: 'MATIC',
    42161: 'ETH',
    8453: 'ETH',
  };

  const fromSymbol = selectedFromToken?.symbol || nativeSymbolByChain[fromChainId] || 'ETH';
  const toSymbol = selectedToToken?.symbol || nativeSymbolByChain[toChainId] || 'ETH';

  const fromDecimals = selectedFromToken?.decimals ?? 18;
  const toDecimals = selectedToToken?.decimals ?? 18;

  const humanFromAmount = useMemo(() => {
    const n = Number(amount);
    if (!isFinite(n)) return 0;
    return n / Math.pow(10, fromDecimals);
  }, [amount, fromDecimals]);

  const humanToAmount = useMemo(() => {
    const n = quote?.toAmount ? Number(quote.toAmount) : 0;
    if (!isFinite(n)) return 0;
    return n / Math.pow(10, toDecimals);
  }, [quote?.toAmount, toDecimals]);

  const { valueUsd: fromUsd } = useUsdForSymbol(fromSymbol, humanFromAmount, null);
  const { valueUsd: toUsd } = useUsdForSymbol(toSymbol, humanToAmount, null);
  const gasUsd = quote?.gasFees?.amountInUsd ?? null;

  // Debounced auto-quote
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!canQuote) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canQuote, fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress]);

  const handleQuote = async () => {
    if (!canQuote) return;
    await getQuote(fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress);
  };

  const canExecute = useMemo(
    () => isConnected && !!quote && !quoteLoading,
    [isConnected, quote, quoteLoading],
  );

  //

  const handleExecuteTxs = async () => {
    try {
      if (!canExecute || !quote) return;
      if (!walletClient || !isEvmConnected) {
        show({ variant: 'warning', title: 'Wallet not connected' });
        return;
      }
      if (walletChainId !== fromChainId) {
        await switchChainAsync({ chainId: fromChainId });
      }
      const txs = quote.userTxs || [];
      for (const tx of txs) {
        await walletClient.sendTransaction({
          account: evmAddress as `0x${string}`,
          to: tx.txData.to as `0x${string}`,
          data: tx.txData.data as `0x${string}`,
          // Convert hex string value to bigint safely
          value: (typeof tx.txData.value === 'string' && tx.txData.value.startsWith('0x')
            ? BigInt(tx.txData.value)
            : BigInt(0)) as bigint,
        });
      }
      show({ variant: 'success', title: 'Transactions sent' });
    } catch (e) {
      show({
        variant: 'error',
        title: 'Execute failed',
        description: e instanceof Error ? e.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <BridgeHeader />

        <SupportedChains
          chains={chains}
          loading={chainsLoading}
          error={chainsError}
          onRetry={refetchChains}
        />

        <BridgeForm
          isConnected={isConnected}
          chains={chains}
          chainsLoading={chainsLoading}
          fromChainId={fromChainId}
          setFromChainId={setFromChainId}
          toChainId={toChainId}
          setToChainId={setToChainId}
          fromTokens={fromTokens}
          toTokens={toTokens}
          fromTokensLoading={fromTokensLoading}
          toTokensLoading={toTokensLoading}
          fromTokensError={fromTokensError}
          toTokensError={toTokensError}
          refetchFromTokens={refetchFromTokens}
          refetchToTokens={refetchToTokens}
          fromTokenAddress={fromTokenAddress}
          setFromTokenAddress={setFromTokenAddress}
          toTokenAddress={toTokenAddress}
          setToTokenAddress={setToTokenAddress}
          amount={amount}
          setAmount={setAmount}
          canQuote={canQuote}
          quoteLoading={quoteLoading}
          onQuote={handleQuote}
          onExecute={handleExecuteTxs}
          canExecute={canExecute}
        />

        {quote && (
          <QuoteSummary
            routeId={quote.routeId}
            fromAmount={quote.fromAmount}
            toAmount={quote.toAmount}
            fromUsd={fromUsd ?? undefined}
            toUsd={toUsd ?? undefined}
            gasAmount={quote.gasFees?.amount ?? null}
            gasSymbol={quote.gasFees?.token?.symbol ?? null}
            gasUsd={gasUsd}
          />
        )}
      </div>
    </div>
  );
}

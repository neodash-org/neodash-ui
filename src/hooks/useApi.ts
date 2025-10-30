import { useState, useEffect, useCallback, useMemo } from 'react';
import { priceAggregator } from '@/lib/api/services/priceAggregator';
import { PortfolioService } from '@/lib/api/services/portfolio';
import { AggregatedPrice, PortfolioData, Transaction } from '@/lib/api/types';
import {
  useSupportedChains as useSupportedChainsCore,
  useSupportedTokens as useSupportedTokensCore,
  useBridgeQuote as useBridgeQuoteCore,
} from '@/hooks/bridge';

// CTO-Level Price Hooks
export const usePrices = (symbols: string[], refreshInterval = 300000) => {
  const [prices, setPrices] = useState<{ [symbol: string]: AggregatedPrice }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize symbols to prevent infinite loops
  const symbolsKey = symbols.join(',');
  const memoizedSymbols = useMemo(() => symbols, [symbolsKey]);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await priceAggregator.getPrices(memoizedSymbols);
      setPrices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  }, [memoizedSymbols]);

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, refreshInterval);
    return () => {
      clearInterval(interval);
    };
  }, [fetchPrices, refreshInterval]);

  return { prices, loading, error, refetch: fetchPrices };
};

// Hook for single price with metrics
export const usePrice = (symbol: string, refreshInterval = 300000) => {
  const [price, setPrice] = useState<AggregatedPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await priceAggregator.getPriceWithMetrics(symbol);
      setPrice(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(fetchPrice, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrice, refreshInterval]);

  return { price, loading, error, refetch: fetchPrice };
};

// Hook for trending coins
export const useTrendingCoins = (limit = 10, refreshInterval = 600000) => {
  const [trending, setTrending] = useState<AggregatedPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await priceAggregator.getTrendingCoins(limit);
      setTrending(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending coins');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTrending();

    const interval = setInterval(fetchTrending, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchTrending, refreshInterval]);

  return { trending, loading, error, refetch: fetchTrending };
};

// Hook for fetching portfolio data
export const usePortfolio = (
  evmAddress?: string,
  solanaAddress?: string,
  refreshInterval = 30000,
) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!evmAddress && !solanaAddress) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await PortfolioService.getCombinedPortfolio(evmAddress || '', solanaAddress);
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio');
    } finally {
      setLoading(false);
    }
  }, [evmAddress, solanaAddress]);

  useEffect(() => {
    fetchPortfolio();

    const interval = setInterval(fetchPortfolio, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPortfolio, refreshInterval]);

  return { portfolio, loading, error, refetch: fetchPortfolio };
};

// Hook for fetching transaction history
export const useTransactionHistory = (
  address?: string,
  chainIds: number[] = [1, 137, 42161, 10, 8453],
  limit = 50,
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!address) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await PortfolioService.getTransactionHistory(address, chainIds, limit);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [address, chainIds, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
};

// Socket.tech Hooks (UI shape) — wrappers over advanced hooks in hooks/bridge

export const useSupportedChains = () => {
  const { data, loading, error, refetch } = useSupportedChainsCore();
  return useMemo(
    () => ({ chains: data ?? [], loading, error, refetch }),
    [data, loading, error, refetch],
  );
};

export const useSupportedTokens = (chainId: number) => {
  const { data, loading, error, refetch } = useSupportedTokensCore(chainId);
  return useMemo(
    () => ({ tokens: data ?? [], loading, error, refetch }),
    [data, loading, error, refetch],
  );
};

export const useBridgeQuote = () => {
  const { data, loading, error, refetch, setParams } = useBridgeQuoteCore();

  const getQuote = useCallback(
    async (
      fromChainId: number,
      toChainId: number,
      fromTokenAddress: string,
      toTokenAddress: string,
      amount: string,
      userAddress: string,
    ) => {
      setParams({ fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress });
      await refetch();
    },
    [setParams, refetch],
  );

  return useMemo(
    () => ({ quote: data, loading, error, getQuote }),
    [data, loading, error, getQuote],
  );
};

// USD price utilities (Agent 4 — Price Aggregator Integration)

type UsdComputationInput = {
  symbol?: string | null;
  amount?: string | number | null; // human-readable amount
  fallbackUsd?: number | null; // e.g., from quote if aggregator lacks USD
};

type UsdComputationResult = {
  priceUsd: number | null;
  valueUsd: number | null;
  usedFallback: boolean;
};

// Pure helper to compute USD from price and amount, with safe parsing
const computeUsdValue = (
  priceUsd?: number | null,
  amount?: string | number | null,
): number | null => {
  if (priceUsd == null) return null;
  const amt = typeof amount === 'string' ? Number(amount) : (amount ?? 0);
  if (!isFinite(amt)) return null;
  return amt * priceUsd;
};

// Selector over an AggregatedPrice map. Memoized to avoid re-renders.
export const useUsdFromAggregatedPrices = (
  pricesMap: { [symbol: string]: AggregatedPrice } | null | undefined,
  { symbol, amount, fallbackUsd }: UsdComputationInput,
): UsdComputationResult => {
  return useMemo<UsdComputationResult>(() => {
    const priceEntry = symbol && pricesMap ? pricesMap[symbol] : undefined;
    const priceUsd = priceEntry?.price ?? null;
    const valueFromAgg = computeUsdValue(priceUsd, amount);

    if (valueFromAgg != null) {
      return { priceUsd, valueUsd: valueFromAgg, usedFallback: false };
    }

    const valueFromFallback = typeof fallbackUsd === 'number' ? fallbackUsd : null;
    return {
      priceUsd: priceUsd ?? null,
      valueUsd: valueFromFallback,
      usedFallback: valueFromAgg == null && valueFromFallback != null,
    };
  }, [pricesMap, symbol, amount, fallbackUsd]);
};

// Convenience hook to fetch a single symbol's price and compute USD with fallback
export const useUsdForSymbol = (
  symbol: string | undefined,
  amount: string | number | null,
  fallbackUsd?: number | null,
  refreshInterval = 300000,
): UsdComputationResult & { loading: boolean; error: string | null } => {
  const { price, loading, error } = usePrice(symbol ?? '', refreshInterval);

  const result = useMemo<UsdComputationResult>(() => {
    const priceUsd = price?.price ?? null;
    const valueFromAgg = computeUsdValue(priceUsd, amount);

    if (valueFromAgg != null) {
      return { priceUsd, valueUsd: valueFromAgg, usedFallback: false };
    }

    const valueFromFallback = typeof fallbackUsd === 'number' ? fallbackUsd : null;
    return {
      priceUsd,
      valueUsd: valueFromFallback,
      usedFallback: valueFromAgg == null && valueFromFallback != null,
    };
  }, [price, amount, fallbackUsd]);

  return { ...result, loading, error };
};

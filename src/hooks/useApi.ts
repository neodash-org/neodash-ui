import { useState, useEffect, useCallback, useMemo } from 'react';
import { priceAggregator } from '@/lib/api/services/priceAggregator';
import { SocketService } from '@/lib/api/services/socket';
import { PortfolioService } from '@/lib/api/services/portfolio';
import { AggregatedPrice, PortfolioData, BridgeQuote, Transaction } from '@/lib/api/types';

// CTO-Level Price Hooks
export const usePrices = (symbols: string[], refreshInterval = 300000) => {
  const [prices, setPrices] = useState<{ [symbol: string]: AggregatedPrice }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize symbols to prevent infinite loops
  const symbolsKey = symbols.join(',');
  const memoizedSymbols = useMemo(() => symbols, [symbols, symbolsKey]);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await priceAggregator.getPrices(memoizedSymbols);
      setPrices(data);
    } catch (err) {
      console.error('usePrices error:', err);
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

// Socket.tech Hooks for bridge functionality

// Hook for getting bridge quotes
export const useBridgeQuote = () => {
  const [quote, setQuote] = useState<BridgeQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuote = useCallback(
    async (
      fromChainId: number,
      toChainId: number,
      fromTokenAddress: string,
      toTokenAddress: string,
      amount: string,
      userAddress: string,
    ) => {
      try {
        setLoading(true);
        setError(null);
        const data = await SocketService.getBridgeQuote(
          fromChainId,
          toChainId,
          fromTokenAddress,
          toTokenAddress,
          amount,
          userAddress,
        );
        setQuote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get quote');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { quote, loading, error, getQuote };
};

// Hook for fetching supported chains
export const useSupportedChains = () => {
  const [chains, setChains] = useState<
    {
      chainId: number;
      name: string;
      symbol: string;
      icon: string;
      isL1: boolean;
      isL2: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChains = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await SocketService.getSupportedChains();
      setChains(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch supported chains');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChains();
  }, [fetchChains]);

  return { chains, loading, error, refetch: fetchChains };
};

// Hook for fetching supported tokens
export const useSupportedTokens = (chainId: number) => {
  const [tokens, setTokens] = useState<
    {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      icon: string;
      chainId: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await SocketService.getSupportedTokens(chainId);
      setTokens(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch supported tokens');
    } finally {
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading, error, refetch: fetchTokens };
};

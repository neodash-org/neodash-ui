import { useState, useEffect, useCallback } from 'react';
import { CoinGeckoService } from '@/lib/api/services/coingecko';
import { SocketService } from '@/lib/api/services/socket';
import { PortfolioService } from '@/lib/api/services/portfolio';
import { CoinGeckoPrice, PortfolioData, BridgeQuote, Transaction } from '@/lib/api/types';

// Hook for fetching cryptocurrency prices
export const usePrices = (coinIds: string[], refreshInterval = 60000) => {
  const [prices, setPrices] = useState<CoinGeckoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CoinGeckoService.getPrices(coinIds);
      setPrices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  }, [coinIds]);

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  return { prices, loading, error, refetch: fetchPrices };
};

// Hook for fetching single coin price
export const usePrice = (coinId: string, refreshInterval = 30000) => {
  const [price, setPrice] = useState<CoinGeckoPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CoinGeckoService.getPrice(coinId);
      setPrice(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price');
    } finally {
      setLoading(false);
    }
  }, [coinId]);

  useEffect(() => {
    fetchPrice();

    const interval = setInterval(fetchPrice, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrice, refreshInterval]);

  return { price, loading, error, refetch: fetchPrice };
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

// Hook for fetching bridge quote
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
        setError(err instanceof Error ? err.message : 'Failed to get bridge quote');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { quote, loading, error, getQuote };
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

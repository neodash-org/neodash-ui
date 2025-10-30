import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { SocketService } from '@/lib/api/services/socket';
import type { BridgeQuote } from '@/lib/api/types';

export type UseBridgeWalletDefaultsResult = {
  fromChainId: number;
  setFromChainId: (chainId: number) => void;
  userAddress: string;
  isConnected: boolean;
};

export function isValidHexAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function validateBridgeInputs(params: {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  userAddress: string;
}): void {
  const { fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount, userAddress } = params;
  if (!Number.isInteger(fromChainId) || fromChainId <= 0) throw new Error('Invalid fromChainId');
  if (!Number.isInteger(toChainId) || toChainId <= 0) throw new Error('Invalid toChainId');
  if (!isValidHexAddress(fromTokenAddress)) throw new Error('Invalid fromTokenAddress');
  if (!isValidHexAddress(toTokenAddress)) throw new Error('Invalid toTokenAddress');
  if (!/^[0-9]+$/.test(amount) || amount === '0') throw new Error('Invalid amount');
  if (!isValidHexAddress(userAddress)) throw new Error('Invalid userAddress');
}

/**
 * Keeps bridge defaults in sync with the connected EVM wallet.
 * - fromChainId follows wallet.chainId and updates on network change
 * - userAddress reflects the connected EVM account; never returns a dummy when connected
 */
export function useBridgeWalletDefaults(
  initialFallbackChainId: number = 1,
): UseBridgeWalletDefaultsResult {
  const { evmWallet, isConnected } = useWallet();

  const [fromChainId, setFromChainId] = useState<number>(
    evmWallet?.chainId ?? initialFallbackChainId,
  );

  // Sync fromChainId whenever the wallet network changes
  useEffect(() => {
    if (evmWallet?.chainId) {
      setFromChainId(evmWallet.chainId);
    }
    // Only react to chain changes
  }, [evmWallet?.chainId]);

  const userAddress = useMemo(() => {
    // When connected, ensure we never return a dummy address
    if (evmWallet?.address) return evmWallet.address;
    return '0x0000000000000000000000000000000000000000';
  }, [evmWallet?.address]);

  return {
    fromChainId,
    setFromChainId,
    userAddress,
    isConnected,
  };
}

// ---------------------------------------------------------------------------
// Agent 10 — Performance Guardrails: caching + inflight dedupe for static lists
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

type CacheEntry<T> = { value: T; timestamp: number };

let chainsCache: CacheEntry<ChainInfo[]> | null = null;
const tokensCache = new Map<number, CacheEntry<TokenInfo[]>>();

// Map of requestKey -> inflight promise for deduplication
const inflightRequests = new Map<string, Promise<unknown>>();

function isFresh(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL_MS;
}

async function fetchWithDedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = inflightRequests.get(key) as Promise<T> | undefined;
  if (existing) return existing;

  const promise = (async () => {
    try {
      return await fetcher();
    } finally {
      inflightRequests.delete(key);
    }
  })();

  inflightRequests.set(key, promise);
  return promise;
}

export interface ChainInfo {
  chainId: number;
  name: string;
  symbol: string;
  icon: string;
  isL1: boolean;
  isL2: boolean;
}

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  chainId: number;
}

export interface UseDataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

function normalizeTokenAddress(address: string | null | undefined): string {
  const value = (address || '').trim().toLowerCase();
  if (
    value === '' ||
    value === NATIVE_TOKEN_ADDRESS ||
    value === '0xeeee' ||
    value === 'native' ||
    value === 'eth' // commonly used placeholder in some UIs
  ) {
    return NATIVE_TOKEN_ADDRESS;
  }
  return value;
}

export function useSupportedChains(): UseDataState<ChainInfo[] | null> {
  const [data, setData] = useState<ChainInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChains = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Serve from cache if fresh, otherwise fetch once with dedupe
      if (chainsCache && isFresh(chainsCache.timestamp)) {
        setData(chainsCache.value);
      } else {
        const chains = await fetchWithDedupe<ChainInfo[]>('chains', async () => {
          const result = await SocketService.getSupportedChains();
          chainsCache = { value: result, timestamp: Date.now() };
          return result;
        });
        setData(chains);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chains');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Immediate seed from cache if fresh to avoid flicker
    if (chainsCache && isFresh(chainsCache.timestamp)) {
      setData(chainsCache.value);
      setLoading(false);
    } else {
      void fetchChains();
    }
  }, [fetchChains]);

  return useMemo(
    () => ({ data, loading, error, refetch: fetchChains }),
    [data, loading, error, fetchChains],
  );
}

export function useSupportedTokens(
  chainId: number | null | undefined,
): UseDataState<TokenInfo[] | null> {
  const memoChainId = useMemo(() => chainId ?? null, [chainId]);
  const [data, setData] = useState<TokenInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = useCallback(async () => {
    if (memoChainId == null) return;
    try {
      setLoading(true);
      setError(null);
      const cacheEntry = tokensCache.get(memoChainId);
      if (cacheEntry && isFresh(cacheEntry.timestamp)) {
        setData(cacheEntry.value);
      } else {
        const tokens = await fetchWithDedupe<TokenInfo[]>(
          `tokens:${memoChainId}` as const,
          async () => {
            const result = await SocketService.getSupportedTokens(memoChainId);
            const normalized = result.map((t) => ({
              ...t,
              address: normalizeTokenAddress(t.address),
            }));
            tokensCache.set(memoChainId, { value: normalized, timestamp: Date.now() });
            return normalized;
          },
        );
        setData(tokens);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
    } finally {
      setLoading(false);
    }
  }, [memoChainId]);

  useEffect(() => {
    setData(null);
    if (memoChainId != null) {
      const cacheEntry = tokensCache.get(memoChainId);
      if (cacheEntry && isFresh(cacheEntry.timestamp)) {
        setData(cacheEntry.value);
        setLoading(false);
      } else {
        void fetchTokens();
      }
    }
  }, [memoChainId, fetchTokens]);

  return useMemo(
    () => ({ data, loading, error, refetch: fetchTokens }),
    [data, loading, error, fetchTokens],
  );
}

export interface BridgeQuoteParams {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string; // use NATIVE_TOKEN_ADDRESS for native
  toTokenAddress: string; // use NATIVE_TOKEN_ADDRESS for native
  amount: string; // in smallest units as string
  userAddress: string;
}

export interface UseBridgeQuoteState extends UseDataState<BridgeQuote | null> {
  // debounce-aware refetch which will run on param changes automatically
  setParams: (params: Partial<BridgeQuoteParams>) => void;
}

export function useBridgeQuote(
  initialParams?: Partial<BridgeQuoteParams>,
  debounceMs: number = 500,
): UseBridgeQuoteState {
  const [params, setParamsState] = useState<Partial<BridgeQuoteParams>>(initialParams ?? {});
  const [data, setData] = useState<BridgeQuote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const memoParams = useMemo(() => {
    const p = params;
    return {
      fromChainId: p.fromChainId,
      toChainId: p.toChainId,
      fromTokenAddress: normalizeTokenAddress(p.fromTokenAddress),
      toTokenAddress: normalizeTokenAddress(p.toTokenAddress),
      amount: p.amount,
      userAddress: (p.userAddress || '').trim(),
    } as Partial<BridgeQuoteParams>;
  }, [params]);

  const canFetch = useMemo(() => {
    return (
      typeof memoParams.fromChainId === 'number' &&
      typeof memoParams.toChainId === 'number' &&
      typeof memoParams.amount === 'string' &&
      memoParams.amount.length > 0 &&
      typeof memoParams.userAddress === 'string' &&
      memoParams.userAddress.length > 0 &&
      typeof memoParams.fromTokenAddress === 'string' &&
      typeof memoParams.toTokenAddress === 'string'
    );
  }, [memoParams]);

  const fetchQuote = useCallback(async () => {
    if (!canFetch) return;
    try {
      setLoading(true);
      setError(null);
      const quote = await SocketService.getBridgeQuote(
        memoParams.fromChainId as number,
        memoParams.toChainId as number,
        memoParams.fromTokenAddress as string,
        memoParams.toTokenAddress as string,
        memoParams.amount as string,
        memoParams.userAddress as string,
      );
      setData(quote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }, [canFetch, memoParams]);

  // Debounced auto-fetch on parameter changes
  useEffect(() => {
    if (!canFetch) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const delay = Math.min(Math.max(debounceMs, 400), 600);
    timeoutRef.current = setTimeout(() => {
      void fetchQuote();
    }, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [canFetch, fetchQuote, debounceMs, memoParams]);

  const setParams = useCallback((updates: Partial<BridgeQuoteParams>) => {
    setParamsState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Manual refetch ignores debounce
  const refetch = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    await fetchQuote();
  }, [fetchQuote]);

  return useMemo(
    () => ({ data, loading, error, refetch, setParams }),
    [data, loading, error, refetch, setParams],
  );
}

export const NATIVE_BRIDGE_TOKEN = NATIVE_TOKEN_ADDRESS;

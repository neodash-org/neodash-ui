import { socketClient } from '../client';
import { SocketRoute, BridgeQuote } from '../types';

// In-memory inflight request dedupe
const inflightRequests: Map<string, Promise<unknown>> = new Map();

type ErrorWithCode = Error & { code?: string };
function withCode(error: Error, code: string): ErrorWithCode {
  const e = error as ErrorWithCode;
  e.code = code;
  return e;
}

function makeKey(endpoint: string, params?: Record<string, unknown>) {
  return `${endpoint}?${params ? JSON.stringify(params) : ''}`;
}

function validatePositiveInt(name: string, value: number) {
  if (!Number.isInteger(value) || value <= 0) {
    throw Object.assign(new Error(`${name} must be a positive integer`), {
      code: 'VALIDATION_ERROR',
    });
  }
}

function validateNonEmptyHex(name: string, value: string) {
  if (!value || typeof value !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw Object.assign(new Error(`${name} must be a valid 0x address`), {
      code: 'VALIDATION_ERROR',
    });
  }
}

function validateAmountString(amount: string) {
  if (!/^[0-9]+$/.test(amount) || amount === '0') {
    throw Object.assign(new Error('amount must be a positive integer string'), {
      code: 'VALIDATION_ERROR',
    });
  }
}

// Socket.tech API Service for bridge functionality
export class SocketService {
  // Get bridge quote
  static async getBridgeQuote(
    fromChainId: number,
    toChainId: number,
    fromTokenAddress: string,
    toTokenAddress: string,
    amount: string,
    userAddress: string,
  ): Promise<BridgeQuote> {
    // Validate inputs
    validatePositiveInt('fromChainId', fromChainId);
    validatePositiveInt('toChainId', toChainId);
    validateNonEmptyHex('fromTokenAddress', fromTokenAddress);
    validateNonEmptyHex('toTokenAddress', toTokenAddress);
    validateAmountString(amount);
    validateNonEmptyHex('userAddress', userAddress);

    const params = {
      fromChainId: fromChainId.toString(),
      toChainId: toChainId.toString(),
      fromTokenAddress,
      toTokenAddress,
      amount,
      userAddress,
      recipient: userAddress,
      referrer: 'neodash',
      uniqueRoutesPerBridge: 'true',
      sort: 'output',
      singleTxOnly: 'false',
    } as const;

    const key = makeKey('/quote', params as unknown as Record<string, unknown>);
    if (inflightRequests.has(key)) {
      return inflightRequests.get(key) as Promise<BridgeQuote>;
    }

    const promise = (async () => {
      const response = await socketClient.get<SocketRoute>('/quote', { ...params });

      if (!response.success || !response.data) {
        const err = new Error(
          `Failed to get bridge quote: ${response.error?.message || 'Unknown error'}`,
        );
        throw withCode(err, 'QUOTE_ERROR');
      }

      const route = response.data;

      return {
        routeId: route.routeId,
        fromChainId: route.fromChainId,
        toChainId: route.toChainId,
        fromToken: {
          address: route.fromTokenAddress,
          symbol: '',
          name: '',
          decimals: 18,
        },
        toToken: {
          address: route.toTokenAddress,
          symbol: '',
          name: '',
          decimals: 18,
        },
        fromAmount: route.fromAmount,
        toAmount: route.toAmount,
        gasFees: route.gasFees,
        serviceTime: route.serviceTime,
        maxServiceTime: route.maxServiceTime,
        bridgeRoute: route.bridgeRoute,
      } as BridgeQuote;
    })();

    inflightRequests.set(key, promise);
    try {
      return await promise;
    } finally {
      inflightRequests.delete(key);
    }
  }

  // Get supported chains
  static async getSupportedChains(): Promise<
    {
      chainId: number;
      name: string;
      symbol: string;
      icon: string;
      isL1: boolean;
      isL2: boolean;
    }[]
  > {
    const key = makeKey('/supported/chains');
    if (inflightRequests.has(key)) {
      return inflightRequests.get(key) as Promise<
        {
          chainId: number;
          name: string;
          symbol: string;
          icon: string;
          isL1: boolean;
          isL2: boolean;
        }[]
      >;
    }

    const promise = (async () => {
      const response = await socketClient.get<{
        success: boolean;
        result: {
          chainId: number;
          name: string;
          isL1: boolean;
          sendingEnabled: boolean;
          icon: string;
          receivingEnabled: boolean;
          currency: {
            symbol: string;
          };
        }[];
      }>('/supported/chains');

      if (!response.success || !response.data || !response.data.result) {
        const err = new Error(
          `Failed to get supported chains: ${response.error?.message || 'Unknown error'}`,
        );
        throw withCode(err, 'CHAINS_ERROR');
      }

      // Map the actual API response format
      return response.data.result.map((chain) => ({
        chainId: chain.chainId,
        name: chain.name,
        symbol: chain.currency.symbol,
        icon: chain.icon,
        isL1: chain.isL1,
        isL2: !chain.isL1,
      }));
    })();

    inflightRequests.set(key, promise);
    try {
      return await promise;
    } finally {
      inflightRequests.delete(key);
    }
  }

  // Get supported tokens for a chain
  static async getSupportedTokens(chainId: number): Promise<
    {
      address: string;
      symbol: string;
      name: string;
      decimals: number;
      icon: string;
      chainId: number;
    }[]
  > {
    validatePositiveInt('chainId', chainId);

    const endpoint = `/token-lists/${chainId}`;
    const key = makeKey(endpoint);
    if (inflightRequests.has(key)) {
      return inflightRequests.get(key) as Promise<
        {
          address: string;
          symbol: string;
          name: string;
          decimals: number;
          icon: string;
          chainId: number;
        }[]
      >;
    }

    const promise = (async () => {
      // Correct endpoint: /token-lists/{chainId}
      const response = await socketClient.get<{
        result: {
          address: string;
          symbol: string;
          name: string;
          decimals: number;
          icon: string;
          chainId: number;
        }[];
      }>(endpoint);

      if (!response.success || !response.data) {
        const err = new Error(
          `Failed to get supported tokens for chain ${chainId}: ${response.error?.message || 'Unknown error'}`,
        );
        throw withCode(err, 'TOKENS_ERROR');
      }

      return response.data.result;
    })();

    inflightRequests.set(key, promise);
    try {
      return await promise;
    } finally {
      inflightRequests.delete(key);
    }
  }

  // Get bridge status
  // WARNING: This endpoint is not officially documented in Bungee Legacy API
  // May need verification or replacement with a different status tracking method
  static async getBridgeStatus(routeId: string): Promise<{
    status: 'pending' | 'completed' | 'failed';
    transactionHash?: string;
    fromChainId: number;
    toChainId: number;
    fromAmount: string;
    toAmount: string;
  }> {
    const response = await socketClient.get<{
      status: 'pending' | 'completed' | 'failed';
      transactionHash?: string;
      fromChainId: number;
      toChainId: number;
      fromAmount: string;
      toAmount: string;
    }>(`/bridge/status/${routeId}`);

    if (!response.success || !response.data) {
      throw new Error(`Failed to get bridge status: ${response.error?.message}`);
    }

    return response.data;
  }

  // Get bridge history for a user
  // WARNING: This endpoint is not officially documented in Bungee Legacy API
  // May need verification or replacement with a different history tracking method
  static async getBridgeHistory(
    userAddress: string,
    limit: number = 50,
    offset: number = 0,
  ): Promise<{
    transactions: {
      id: string;
      fromChainId: number;
      toChainId: number;
      fromTokenAddress: string;
      toTokenAddress: string;
      fromAmount: string;
      toAmount: string;
      status: 'pending' | 'completed' | 'failed';
      transactionHash?: string;
      timestamp: number;
    }[];
    total: number;
  }> {
    const response = await socketClient.get<{
      result: {
        transactions: {
          id: string;
          fromChainId: number;
          toChainId: number;
          fromTokenAddress: string;
          toTokenAddress: string;
          fromAmount: string;
          toAmount: string;
          status: 'pending' | 'completed' | 'failed';
          transactionHash?: string;
          timestamp: number;
        }[];
        total: number;
      };
    }>('/bridge/history', {
      userAddress,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (!response.success || !response.data) {
      throw new Error(`Failed to get bridge history: ${response.error?.message}`);
    }

    return response.data.result;
  }
}

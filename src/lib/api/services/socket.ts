import { socketClient } from '../client';
import { SocketRoute, BridgeQuote } from '../types';

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
    const response = await socketClient.get<SocketRoute>('/quote', {
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
    });

    if (!response.success || !response.data) {
      throw new Error(`Failed to get bridge quote: ${response.error?.message}`);
    }

    const route = response.data;

    return {
      routeId: route.routeId,
      fromChainId: route.fromChainId,
      toChainId: route.toChainId,
      fromToken: {
        address: route.fromTokenAddress,
        symbol: '', // Will be populated by token info
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
    };
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
    const response = await socketClient.get<{
      result: {
        chainId: number;
        name: string;
        symbol: string;
        icon: string;
        isL1: boolean;
        isL2: boolean;
      }[];
    }>('/supported/chains');

    if (!response.success || !response.data) {
      throw new Error(`Failed to get supported chains: ${response.error?.message}`);
    }

    return response.data.result;
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
    }>(`/token-lists/${chainId}`);

    if (!response.success || !response.data) {
      throw new Error(
        `Failed to get supported tokens for chain ${chainId}: ${response.error?.message}`,
      );
    }

    return response.data.result;
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

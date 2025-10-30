import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SocketService } from '../socket';
import * as client from '../../client';
import type { ApiResponse } from '../../types';

type SocketClientLike = {
  get: <T>(endpoint: string, params?: Record<string, string>) => Promise<ApiResponse<T>>;
};

describe('SocketService DTO mapping and validation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('maps supported chains result correctly', async () => {
    const sc = client.socketClient as unknown as SocketClientLike;
    vi.spyOn(sc, 'get').mockResolvedValue({
      success: true,
      data: {
        success: true,
        result: [
          {
            chainId: 1,
            name: 'Ethereum',
            isL1: true,
            sendingEnabled: true,
            icon: 'eth.svg',
            receivingEnabled: true,
            currency: { symbol: 'ETH' },
          },
        ],
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse<unknown>);

    const chains = await SocketService.getSupportedChains();
    expect(chains).toEqual([
      {
        chainId: 1,
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'eth.svg',
        isL1: true,
        isL2: false,
      },
    ]);
  });

  it('maps supported tokens result correctly', async () => {
    const sc = client.socketClient as unknown as SocketClientLike;
    vi.spyOn(sc, 'get').mockResolvedValue({
      success: true,
      data: {
        result: [
          {
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            symbol: 'ETH',
            name: 'Ether',
            decimals: 18,
            icon: 'eth.svg',
            chainId: 1,
          },
        ],
      },
      timestamp: new Date().toISOString(),
    } as ApiResponse<unknown>);

    const tokens = await SocketService.getSupportedTokens(1);
    expect(tokens[0].symbol).toBe('ETH');
  });

  it('validates getBridgeQuote params', async () => {
    await expect(
      SocketService.getBridgeQuote(
        0,
        137,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        '0x0000000000000000000000000000000000001010',
        '1000',
        '0x0000000000000000000000000000000000000000',
      ),
    ).rejects.toHaveProperty('code', 'VALIDATION_ERROR');
  });
});

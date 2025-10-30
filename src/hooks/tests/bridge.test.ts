import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useBridgeQuote } from '@/hooks/bridge';

vi.useFakeTimers();

vi.mock('@/lib/api/services/socket', () => {
  return {
    SocketService: {
      getBridgeQuote: vi.fn(async () => ({
        routeId: 'route-1',
        fromChainId: 1,
        toChainId: 137,
        fromToken: {
          address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          symbol: 'ETH',
          name: 'Ether',
          decimals: 18,
        },
        toToken: {
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: 6,
        },
        fromAmount: '100000000000000000',
        toAmount: '295000',
        gasFees: {
          amount: '1000000000000000',
          amountInUsd: 3,
          token: {
            address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            symbol: 'ETH',
            name: 'Ether',
            decimals: 18,
            icon: '',
            chainId: 1,
          },
        },
        serviceTime: 45,
        maxServiceTime: 90,
        bridgeRoute: true,
      })),
    },
  };
});

describe('useBridgeQuote', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debounces rapid param changes and fetches once', async () => {
    const { result } = renderHook(() => useBridgeQuote({}, 500));

    act(() => {
      result.current.setParams({ fromChainId: 1 });
      result.current.setParams({ toChainId: 137 });
      result.current.setParams({
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      });
      result.current.setParams({ amount: '100000000000000000' });
      result.current.setParams({ userAddress: '0x000000000000000000000000000000000000dEaD' });
    });

    // advance less than debounce to ensure not called yet
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    const { SocketService } = await import('@/lib/api/services/socket');
    expect(SocketService.getBridgeQuote).not.toHaveBeenCalled();

    // advance past debounce
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(SocketService.getBridgeQuote).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).not.toBeNull();
  });

  it('does not fetch until required params are set', async () => {
    const { result } = renderHook(() => useBridgeQuote({}, 400));

    await act(async () => {
      result.current.setParams({ fromChainId: 1, toChainId: 137 });
      vi.advanceTimersByTime(500);
    });

    const { SocketService } = await import('@/lib/api/services/socket');
    expect(SocketService.getBridgeQuote).not.toHaveBeenCalled();

    await act(async () => {
      result.current.setParams({
        fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        amount: '100',
      });
      vi.advanceTimersByTime(450);
    });

    expect(SocketService.getBridgeQuote).not.toHaveBeenCalled();

    await act(async () => {
      result.current.setParams({ userAddress: '0x000000000000000000000000000000000000dEaD' });
      vi.advanceTimersByTime(450);
    });

    expect(SocketService.getBridgeQuote).toHaveBeenCalledTimes(1);
  });

  it('manual refetch bypasses debounce', async () => {
    const { result } = renderHook(() =>
      useBridgeQuote(
        {
          fromChainId: 1,
          toChainId: 137,
          fromTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          toTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          amount: '1',
          userAddress: '0x000000000000000000000000000000000000dEaD',
        },
        500,
      ),
    );

    await act(async () => {
      await result.current.refetch();
    });

    const { SocketService } = await import('@/lib/api/services/socket');
    expect(SocketService.getBridgeQuote).toHaveBeenCalledTimes(1);
  });
});

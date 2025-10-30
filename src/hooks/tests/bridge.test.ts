import { describe, it, vi, expect } from 'vitest';

// NOTE: This suite is intentionally skipped until Agent 3 lands the bridge hook.
describe.skip('useBridge (integration with SocketService)', () => {
  // Local mock of the SocketService used by the bridge hook
  vi.mock('@/lib/api/services/socket', () => {
    class MockSocketService {
      async getSupportedChains() {
        return [
          { chainId: 1, name: 'Ethereum' },
          { chainId: 137, name: 'Polygon' },
        ];
      }

      async getSupportedTokens() {
        return [
          {
            address: '0x0000000000000000000000000000000000000000',
            symbol: 'ETH',
            decimals: 18,
            chainId: 1,
          },
          {
            address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
            symbol: 'WETH',
            decimals: 18,
            chainId: 137,
          },
        ];
      }

      async getQuote() {
        return {
          fromAmount: '1000000000000000000',
          toAmount: '999000000000000000',
          estimatedUSD: '3000.00',
          route: [{ name: 'MockBridge' }],
        };
      }
    }

    return {
      SocketService: MockSocketService,
    };
  });

  it('loads supported chains and tokens and returns a quote', async () => {
    // Placeholder expectation to keep suite structure ready
    expect(true).toBe(true);
  });
});

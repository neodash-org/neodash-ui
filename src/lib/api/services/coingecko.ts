import { coinGeckoClient } from '../client';
import { CoinGeckoPrice, CoinGeckoMarketData } from '../types';

// CoinGecko API Service for price data and market information
export class CoinGeckoService {
  // Get current prices for multiple coins
  static async getPrices(coinIds: string[]): Promise<CoinGeckoPrice[]> {
    const response = await coinGeckoClient.get<CoinGeckoPrice[]>('/coins/markets', {
      vs_currency: 'usd',
      ids: coinIds.join(','),
      order: 'market_cap_desc',
      per_page: '100',
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h',
    });

    if (!response.success || !response.data) {
      throw new Error(`Failed to fetch prices: ${response.error?.message}`);
    }

    return response.data;
  }

  // Get price for a single coin
  static async getPrice(coinId: string): Promise<CoinGeckoPrice> {
    const response = await coinGeckoClient.get<CoinGeckoPrice[]>(`/coins/markets`, {
      vs_currency: 'usd',
      ids: coinId,
      order: 'market_cap_desc',
      per_page: '1',
      page: '1',
      sparkline: 'false',
      price_change_percentage: '24h',
    });

    if (!response.success || !response.data || response.data.length === 0) {
      throw new Error(`Failed to fetch price for ${coinId}: ${response.error?.message}`);
    }

    return response.data[0];
  }

  // Get historical market data
  static async getHistoricalData(coinId: string, days: number = 7): Promise<CoinGeckoMarketData> {
    const response = await coinGeckoClient.get<CoinGeckoMarketData>(
      `/coins/${coinId}/market_chart`,
      {
        vs_currency: 'usd',
        days: days.toString(),
        interval: days <= 1 ? 'hourly' : 'daily',
      },
    );

    if (!response.success || !response.data) {
      throw new Error(`Failed to fetch historical data for ${coinId}: ${response.error?.message}`);
    }

    return response.data;
  }

  // Get trending coins
  static async getTrending(): Promise<CoinGeckoPrice[]> {
    const response = await coinGeckoClient.get<CoinGeckoPrice[]>('/search/trending');

    if (!response.success || !response.data) {
      throw new Error(`Failed to fetch trending coins: ${response.error?.message}`);
    }

    return response.data;
  }

  // Get supported coins list
  static async getSupportedCoins(): Promise<{ id: string; symbol: string; name: string }[]> {
    const response =
      await coinGeckoClient.get<{ id: string; symbol: string; name: string }[]>('/coins/list');

    if (!response.success || !response.data) {
      throw new Error(`Failed to fetch supported coins: ${response.error?.message}`);
    }

    return response.data;
  }

  // Get global market data
  static async getGlobalMarketData(): Promise<{
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
  }> {
    const response = await coinGeckoClient.get<{
      total_market_cap: { usd: number };
      total_volume: { usd: number };
      market_cap_percentage: { [key: string]: number };
      market_cap_change_percentage_24h_usd: number;
    }>('/global');

    if (!response.success || !response.data) {
      throw new Error(`Failed to fetch global market data: ${response.error?.message}`);
    }

    return response.data;
  }
}

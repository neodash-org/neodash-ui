import { moralisClient, heliusClient } from '../client';
import { PortfolioData, TokenBalance, Transaction } from '../types';

// Portfolio API Service for fetching user portfolio data
export class PortfolioService {
  // Get EVM portfolio data (Ethereum, Polygon, etc.)
  static async getEvmPortfolio(
    address: string,
    chainIds: number[] = [1, 137, 42161, 10, 8453], // Ethereum, Polygon, Arbitrum, Optimism, Base
  ): Promise<PortfolioData> {
    const allTokens: TokenBalance[] = [];
    let totalValueUsd = 0;

    for (const chainId of chainIds) {
      try {
        const response = await moralisClient.get<{
          result: {
            token_address: string;
            symbol: string;
            name: string;
            decimals: number;
            balance: string;
            balance_formatted: string;
            possible_spam: boolean;
            verified_contract: boolean;
            balance_24h: string;
            balance_24h_formatted: string;
            usd_price: number;
            usd_price_24h: number;
            usd_value: number;
            usd_value_24h: number;
            logo: string;
            thumbnail: string;
          }[];
        }>(`/${address}/erc20`, {
          chain: this.getChainName(chainId),
          exclude_spam: 'true',
          exclude_unverified_contracts: 'true',
        });

        if (response.success && response.data) {
          const tokens = response.data.result.map((token) => ({
            tokenAddress: token.token_address,
            symbol: token.symbol,
            name: token.name,
            decimals: token.decimals,
            balance: token.balance,
            balanceFormatted: token.balance_formatted,
            priceUsd: token.usd_price,
            valueUsd: token.usd_value,
            chainId,
            logoURI: token.logo || token.thumbnail,
          }));

          allTokens.push(...tokens);
          totalValueUsd += tokens.reduce((sum, token) => sum + token.valueUsd, 0);
        }
      } catch (error) {
        console.warn(`Failed to fetch portfolio for chain ${chainId}:`, error);
      }
    }

    // Group by chain
    const chains = chainIds.map((chainId) => {
      const chainTokens = allTokens.filter((token) => token.chainId === chainId);
      return {
        chainId,
        chainName: this.getChainName(chainId),
        totalValueUsd: chainTokens.reduce((sum, token) => sum + token.valueUsd, 0),
        tokenCount: chainTokens.length,
      };
    });

    return {
      totalValueUsd,
      tokens: allTokens,
      chains,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Get Solana portfolio data
  static async getSolanaPortfolio(address: string): Promise<PortfolioData> {
    try {
      const response = await heliusClient.get<{
        nativeBalance: number;
        tokens: {
          mint: string;
          amount: number;
          decimals: number;
          uiAmount: number;
          symbol?: string;
          name?: string;
          image?: string;
          price?: number;
        }[];
      }>(`/accounts/${address}/balances`, {
        displayOptions: 'jsonParsed',
      });

      if (!response.success || !response.data) {
        throw new Error(`Failed to fetch Solana portfolio: ${response.error?.message}`);
      }

      const { nativeBalance, tokens } = response.data;
      const solanaTokens: TokenBalance[] = [];

      // Add SOL (native token)
      if (nativeBalance > 0) {
        solanaTokens.push({
          tokenAddress: 'So11111111111111111111111111111111111111112', // SOL mint address
          symbol: 'SOL',
          name: 'Solana',
          decimals: 9,
          balance: nativeBalance.toString(),
          balanceFormatted: (nativeBalance / 1e9).toString(),
          priceUsd: 0, // Will be fetched separately
          valueUsd: 0,
          chainId: 101, // Solana mainnet
        });
      }

      // Add SPL tokens
      tokens.forEach((token) => {
        if (token.uiAmount && token.uiAmount > 0) {
          solanaTokens.push({
            tokenAddress: token.mint,
            symbol: token.symbol || 'UNKNOWN',
            name: token.name || 'Unknown Token',
            decimals: token.decimals,
            balance: token.amount.toString(),
            balanceFormatted: token.uiAmount.toString(),
            priceUsd: token.price || 0,
            valueUsd: token.price ? token.uiAmount * token.price : 0,
            chainId: 101, // Solana mainnet
            logoURI: token.image,
          });
        }
      });

      const totalValueUsd = solanaTokens.reduce((sum, token) => sum + token.valueUsd, 0);

      return {
        totalValueUsd,
        tokens: solanaTokens,
        chains: [
          {
            chainId: 101,
            chainName: 'solana',
            totalValueUsd,
            tokenCount: solanaTokens.length,
          },
        ],
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to fetch Solana portfolio:', error);
      return {
        totalValueUsd: 0,
        tokens: [],
        chains: [],
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  // Get combined portfolio (EVM + Solana)
  static async getCombinedPortfolio(
    evmAddress: string,
    solanaAddress?: string,
  ): Promise<PortfolioData> {
    const [evmPortfolio, solanaPortfolio] = await Promise.all([
      this.getEvmPortfolio(evmAddress),
      solanaAddress ? this.getSolanaPortfolio(solanaAddress) : null,
    ]);

    if (!solanaPortfolio) {
      return evmPortfolio;
    }

    return {
      totalValueUsd: evmPortfolio.totalValueUsd + solanaPortfolio.totalValueUsd,
      tokens: [...evmPortfolio.tokens, ...solanaPortfolio.tokens],
      chains: [...evmPortfolio.chains, ...solanaPortfolio.chains],
      lastUpdated: new Date().toISOString(),
    };
  }

  // Get transaction history
  static async getTransactionHistory(
    address: string,
    chainIds: number[] = [1, 137, 42161, 10, 8453],
    limit: number = 50,
  ): Promise<Transaction[]> {
    const allTransactions: Transaction[] = [];

    for (const chainId of chainIds) {
      try {
        const response = await moralisClient.get<{
          result: {
            hash: string;
            from_address: string;
            to_address: string;
            value: string;
            gas: string;
            gas_price: string;
            block_number: string;
            block_hash: string;
            block_timestamp: string;
            receipt_status: string;
          }[];
        }>(`/${address}`, {
          chain: this.getChainName(chainId),
          limit: limit.toString(),
        });

        if (response.success && response.data) {
          const transactions = response.data.result.map((tx) => ({
            hash: tx.hash,
            from: tx.from_address,
            to: tx.to_address,
            value: tx.value,
            gasUsed: tx.gas,
            gasPrice: tx.gas_price,
            blockNumber: parseInt(tx.block_number),
            blockHash: tx.block_hash,
            timestamp: parseInt(tx.block_timestamp) * 1000,
            chainId,
            status: (tx.receipt_status === '1' ? 'confirmed' : 'failed') as 'confirmed' | 'failed',
            type: 'send' as const,
          }));

          allTransactions.push(...transactions);
        }
      } catch (error) {
        console.warn(`Failed to fetch transactions for chain ${chainId}:`, error);
      }
    }

    return allTransactions.sort((a, b) => b.timestamp - a.timestamp);
  }

  private static getChainName(chainId: number): string {
    const chainMap: Record<number, string> = {
      1: 'eth',
      137: 'polygon',
      42161: 'arbitrum',
      10: 'optimism',
      8453: 'base',
      56: 'bsc',
      250: 'fantom',
      43114: 'avalanche',
    };
    return chainMap[chainId] || 'eth';
  }
}

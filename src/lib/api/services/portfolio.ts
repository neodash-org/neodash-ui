import { heliusClient } from '../client';
import { PortfolioData, TokenBalance, Transaction } from '../types';
import { API_CONFIG } from '../config';

// Portfolio API Service for fetching user portfolio data
export class PortfolioService {
  // Get EVM portfolio data using Alchemy (Ethereum, Polygon, etc.)
  static async getEvmPortfolio(
    address: string,
    chainIds: number[] = [1, 137, 42161, 10, 8453], // Ethereum, Polygon, Arbitrum, Optimism, Base
  ): Promise<PortfolioData> {
    const allTokens: TokenBalance[] = [];
    const totalValueUsd = 0;

    for (const chainId of chainIds) {
      try {
        // Alchemy's getTokenBalances endpoint
        const alchemyUrl = this.getAlchemyUrl(chainId);
        const response = await fetch(alchemyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'alchemy_getTokenBalances',
            params: [address],
            id: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`Alchemy API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.result && data.result.tokenBalances) {
          // Fetch metadata for each token
          for (const tokenBalance of data.result.tokenBalances) {
            if (tokenBalance.tokenBalance === '0x0') continue; // Skip zero balances

            try {
              const metadataResponse = await fetch(alchemyUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  method: 'alchemy_getTokenMetadata',
                  params: [tokenBalance.contractAddress],
                  id: 1,
                }),
              });

              const metadata = await metadataResponse.json();

              if (metadata.result) {
                const balance = BigInt(tokenBalance.tokenBalance);
                const decimals = metadata.result.decimals || 18;
                const balanceFormatted = (Number(balance) / Math.pow(10, decimals)).toString();

                allTokens.push({
                  tokenAddress: tokenBalance.contractAddress,
                  symbol: metadata.result.symbol || 'UNKNOWN',
                  name: metadata.result.name || 'Unknown Token',
                  decimals,
                  balance: balance.toString(),
                  balanceFormatted,
                  priceUsd: 0, // Alchemy doesn't provide prices - need to fetch separately
                  valueUsd: 0,
                  chainId,
                  logoURI: metadata.result.logo,
                });
              }
            } catch (metadataError) {
              console.warn(
                `Failed to fetch metadata for token ${tokenBalance.contractAddress}:`,
                metadataError,
              );
            }
          }
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

  // Get transaction history using Alchemy
  static async getTransactionHistory(
    address: string,
    chainIds: number[] = [1, 137, 42161, 10, 8453],
    limit: number = 50,
  ): Promise<Transaction[]> {
    const allTransactions: Transaction[] = [];

    for (const chainId of chainIds) {
      try {
        const alchemyUrl = this.getAlchemyUrl(chainId);
        const response = await fetch(alchemyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'alchemy_getAssetTransfers',
            params: [
              {
                fromAddress: address,
                category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
                maxCount: `0x${limit.toString(16)}`,
                excludeZeroValue: true,
                withMetadata: true,
              },
            ],
            id: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`Alchemy API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.result && data.result.transfers) {
          const transactions = data.result.transfers.map(
            (tx: {
              hash: string;
              from: string;
              to: string;
              value: number;
              blockNum: string;
              metadata: { blockTimestamp: string };
              category: string;
              asset: string;
            }) => ({
              hash: tx.hash,
              from: tx.from,
              to: tx.to || '',
              value: tx.value?.toString() || '0',
              gasUsed: '0',
              gasPrice: '0',
              blockNumber: parseInt(tx.blockNum, 16),
              blockHash: '',
              timestamp: new Date(tx.metadata.blockTimestamp).getTime(),
              chainId,
              status: 'confirmed' as const,
              type: 'send' as const,
            }),
          );

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

  private static getAlchemyUrl(chainId: number): string {
    const apiKey = API_CONFIG.ALCHEMY.API_KEY;

    // Alchemy network mapping
    const networkMap: Record<number, string> = {
      1: 'eth-mainnet',
      137: 'polygon-mainnet',
      42161: 'arb-mainnet',
      10: 'opt-mainnet',
      8453: 'base-mainnet',
      11155111: 'eth-sepolia', // Sepolia testnet
    };

    const network = networkMap[chainId] || 'eth-mainnet';
    return `https://${network}.g.alchemy.com/v2/${apiKey}`;
  }
}

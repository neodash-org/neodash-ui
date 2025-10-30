import React from 'react';
import type { WalletName } from '@solana/wallet-adapter-base';

export function useSolanaConnectFlow(
  select: (name: WalletName | null) => void,
  connect: () => Promise<void>,
) {
  const connectWallet = React.useCallback(
    async (adapterName: WalletName) => {
      try {
        // Select the wallet first
        select(adapterName);
        
        // Wait a bit longer for the wallet adapter to become ready
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Connect
        await connect();
        return { ok: true as const };
      } catch (error) {
        // Check if it's a WalletNotSelectedError and retry once
        if (error instanceof Error && error.message.includes('WalletNotSelectedError')) {
          try {
            // Retry with a longer delay
            select(adapterName);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await connect();
            return { ok: true as const };
          } catch (retryError) {
            return { ok: false as const, error: retryError };
          }
        }
        return { ok: false as const, error };
      }
    },
    [select, connect],
  );

  return { connectWallet };
}

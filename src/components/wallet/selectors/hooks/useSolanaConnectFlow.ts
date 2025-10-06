import React from 'react';
import type { WalletName } from '@solana/wallet-adapter-base';

export function useSolanaConnectFlow(
  select: (name: WalletName | null) => void,
  connect: () => Promise<void>,
) {
  const connectWallet = React.useCallback(
    async (adapterName: WalletName) => {
      try {
        // Select the wallet first (do not await)
        select(adapterName);
        // Wait for the wallet adapter to become ready
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Connect
        await connect();
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, error };
      }
    },
    [select, connect],
  );

  return { connectWallet };
}

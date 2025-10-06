import React from 'react';

export function useSolanaConnectFlow(select: (name: string) => void, connect: () => Promise<void>) {
  const connectWallet = React.useCallback(
    async (adapterName: string) => {
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

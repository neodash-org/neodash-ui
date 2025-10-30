import React from 'react';
import type { Wallet } from '@solana/wallet-adapter-react';

const KNOWN_WALLETS = ['phantom', 'solflare', 'backpack', 'glow'];

export function useSolanaWalletList(wallets: Wallet[] | undefined) {
  return React.useMemo(() => {
    const list = wallets ?? [];
    const validWallets = list.filter((w) => {
      const name = w.adapter.name.toLowerCase();
      return KNOWN_WALLETS.includes(name) && w.adapter.readyState === 'Installed';
    });

    return validWallets;
  }, [wallets]);
}

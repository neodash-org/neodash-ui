'use client';

import { useMemo } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wallet/wagmi';

// Import RainbowKit styles
import '@rainbow-me/rainbowkit/styles.css';

interface EVMWalletProviderProps {
  children: React.ReactNode;
}

export function EVMWalletProvider({ children }: EVMWalletProviderProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme()}
          modalSize="compact"
          showRecentTransactions={true}
          appInfo={{
            appName: 'NeoDash',
            learnMoreUrl: 'https://neodash.org',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

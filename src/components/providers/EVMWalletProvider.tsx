'use client';

import { useMemo, useEffect, useState } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getConfig } from '@/lib/wallet/wagmi';
import { mainnet } from 'wagmi/chains';

// Import RainbowKit styles
import '@rainbow-me/rainbowkit/styles.css';

interface EVMWalletProviderProps {
  children: React.ReactNode;
}

export function EVMWalletProvider({ children }: EVMWalletProviderProps) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const [config, setConfig] = useState<ReturnType<typeof getConfig> | null>(null);

  // Only initialize config on client-side to avoid SSR issues with indexedDB
  useEffect(() => {
    setConfig(getConfig());
  }, []);

  // Create a minimal fallback config for SSR/initial render
  const fallbackConfig = useMemo(() => {
    return createConfig({
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
    });
  }, []);

  // Always render WagmiProvider, but use fallback config if real config isn't ready
  const wagmiConfig = config || fallbackConfig;

  return (
    <WagmiProvider config={wagmiConfig}>
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

'use client';

import { useMemo, useEffect, useState } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getConfig } from '@/lib/wallet/wagmi';

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

  // Show children even before config is ready (for SSR)
  if (!config) {
    return <>{children}</>;
  }

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

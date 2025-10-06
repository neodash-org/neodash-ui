import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains';

export const supportedChains = [mainnet, polygon, arbitrum, optimism, base, sepolia];

// Lazy config creation to avoid SSR issues with indexedDB
let _config: ReturnType<typeof getDefaultConfig> | null = null;

export const getConfig = (): ReturnType<typeof getDefaultConfig> | null => {
  // Only create config on client-side
  if (typeof window === 'undefined') {
    // Return null for SSR that won't try to access indexedDB
    return null;
  }

  if (!_config) {
    _config = getDefaultConfig({
      appName: 'NeoDash',
      projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2b8a2eba47be02b3f633537d77198fc6',
      chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
      ssr: false,
    });
  }

  return _config;
};

// Export a getter for backwards compatibility
export const config = new Proxy({} as ReturnType<typeof getDefaultConfig>, {
  get(_target, prop) {
    const cfg = getConfig();
    return cfg ? cfg[prop as keyof typeof cfg] : undefined;
  },
});

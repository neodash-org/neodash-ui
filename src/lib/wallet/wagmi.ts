import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NeoDash',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '2b8a2eba47be02b3f633537d77198fc6',
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const supportedChains = [mainnet, polygon, arbitrum, optimism, base, sepolia];

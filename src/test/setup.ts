import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: () => ({
    address: undefined,
    isConnected: false,
    chain: undefined,
  }),
  useDisconnect: () => ({
    disconnect: vi.fn(),
  }),
}));

// Mock Solana wallet adapter
vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    publicKey: null,
    connected: false,
    wallet: null,
    connect: vi.fn(),
    disconnect: vi.fn(),
  }),
}));

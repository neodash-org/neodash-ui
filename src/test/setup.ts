import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock wagmi hooks
vi.mock('wagmi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('wagmi')>();
  return {
    ...actual,
    useAccount: () => ({
      address: undefined,
      isConnected: false,
      chain: undefined,
    }),
    useDisconnect: () => ({
      disconnect: vi.fn(),
    }),
    // Some components call useConfig in tests; provide a minimal stub
    useConfig: () => ({ mocked: true }),
  };
});

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

import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useWalletConnection, useWalletBalance, useWalletTransaction } from '../hooks';
import { WalletInfo } from '../types';

// Mock wallet context
const mockWalletContext = {
  isConnected: false,
  wallet: null,
  disconnectWallet: vi.fn(),
  connectWallet: vi.fn(),
  error: null,
  setError: vi.fn(),
  isModalOpen: false,
  openModal: vi.fn(),
  closeModal: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  status: 'disconnected' as const,
  currentWallet: null as WalletInfo | null,
};

vi.mock('@/context/WalletContext', () => ({
  useWallet: () => mockWalletContext,
}));

// Mock PostHog
vi.mock('@/hooks', () => ({
  usePostHog: () => ({
    trackFeatureUsage: vi.fn(),
  }),
}));

describe('useWalletConnection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns wallet connection state', () => {
    const { result } = renderHook(() => useWalletConnection());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.wallet).toBe(null);
    expect(result.current.disconnectWallet).toBeDefined();
  });

  it('calls disconnectWallet when disconnect is called', () => {
    const { result } = renderHook(() => useWalletConnection());

    act(() => {
      result.current.disconnectWallet();
    });

    expect(mockWalletContext.disconnect).toHaveBeenCalled();
  });
});

describe('useWalletBalance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns balance state', () => {
    const { result } = renderHook(() => useWalletBalance());

    expect(result.current.balance).toBe('0');
    expect(result.current.formattedBalance).toBe('0.00');
    expect(result.current.shortAddress).toBe('');
    expect(result.current.fullAddress).toBe('');
    expect(result.current.currency).toBe('SOL');
  });
});

describe('useWalletTransaction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns transaction state', () => {
    const { result } = renderHook(() => useWalletTransaction());

    expect(result.current.sendTransaction).toBeDefined();
    expect(result.current.signMessage).toBeDefined();
    expect(result.current.canSendTransactions).toBe(false);
  });

  it('sends transaction when sendTransaction is called', async () => {
    // Mock connected wallet
    const mockWallet = {
      type: 'evm' as const,
      address: '0x123...abc',
      name: 'Mock Wallet',
      balance: '1.0',
    };
    mockWalletContext.currentWallet = mockWallet;

    const { result } = renderHook(() => useWalletTransaction());

    await act(async () => {
      const response = await result.current.sendTransaction();
      expect(response.success).toBe(true);
      expect(response.hash).toMatch(/^0x[a-f0-9]+$/);
    });
  });
});

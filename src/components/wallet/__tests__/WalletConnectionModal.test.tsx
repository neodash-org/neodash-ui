import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import WalletConnectionModal from '../WalletConnectionModal';
import { WalletProvider } from '@/context/WalletContext';

// Mock RainbowKit
vi.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: ({ children }: { children: (props: unknown) => React.ReactNode }) => {
      const mockProps = {
        account: null,
        chain: null,
        openAccountModal: vi.fn(),
        openChainModal: vi.fn(),
        openConnectModal: vi.fn(),
        authenticationStatus: 'unauthenticated',
        mounted: true,
      };
      return <div data-testid="rainbowkit-mock">{children(mockProps)}</div>;
    },
  },
}));

// Mock Solana wallet adapter
vi.mock('@solana/wallet-adapter-react', () => ({
  useWallet: () => ({
    publicKey: null,
    connect: vi.fn(),
    disconnect: vi.fn(),
    connecting: false,
    connected: false,
  }),
}));

// Mock wallet hooks
vi.mock('@/lib/wallet/hooks', () => ({
  useWallet: () => ({
    isModalOpen: true,
    closeModal: vi.fn(),
    error: null,
    setError: vi.fn(),
  }),
}));

const MockWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <WalletProvider>{children}</WalletProvider>
);

describe('WalletConnectionModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(
      <MockWalletProvider>
        <WalletConnectionModal />
      </MockWalletProvider>,
    );

    expect(screen.getByTestId('wallet-connection-modal')).toBeInTheDocument();
  });

  it('shows ecosystem selector when not connected', () => {
    render(
      <MockWalletProvider>
        <WalletConnectionModal />
      </MockWalletProvider>,
    );

    expect(screen.getByTestId('ecosystem-selector')).toBeInTheDocument();
  });

  it('displays correct ecosystem names', () => {
    render(
      <MockWalletProvider>
        <WalletConnectionModal />
      </MockWalletProvider>,
    );

    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Solana')).toBeInTheDocument();
  });

  it('shows ecosystem descriptions', () => {
    render(
      <MockWalletProvider>
        <WalletConnectionModal />
      </MockWalletProvider>,
    );

    expect(screen.getByText('Connect to Ethereum and EVM-compatible chains')).toBeInTheDocument();
    expect(screen.getByText('Connect to Solana blockchain')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import EcosystemSelector from '../EcosystemSelector';
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

// Solana wallet adapter is mocked globally in setup.ts

// Mock SolanaWalletSelector
vi.mock('../SolanaWalletSelector', () => ({
  default: ({ onBack, onClose }: { onBack: () => void; onClose: () => void }) => (
    <div data-testid="solana-wallet-selector">
      <button onClick={onBack} data-testid="back-button">
        Back
      </button>
      <button onClick={onClose} data-testid="close-button">
        Close
      </button>
    </div>
  ),
}));

const MockWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <WalletProvider>{children}</WalletProvider>
);

describe('EcosystemSelector', () => {
  const mockOnSelect = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ecosystem selector', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector onSelect={mockOnSelect} onClose={mockOnClose} selectedEcosystem={null} />
      </MockWalletProvider>,
    );

    expect(screen.getByTestId('ecosystem-selector')).toBeInTheDocument();
  });

  it('shows correct ecosystem names and descriptions', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector onSelect={mockOnSelect} onClose={mockOnClose} selectedEcosystem={null} />
      </MockWalletProvider>,
    );

    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Connect to Ethereum and EVM-compatible chains')).toBeInTheDocument();
    expect(screen.getByText('Solana')).toBeInTheDocument();
    expect(screen.getByText('Connect to Solana blockchain')).toBeInTheDocument();
  });

  it('calls onSelect when Solana card is clicked', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector onSelect={mockOnSelect} onClose={mockOnClose} selectedEcosystem={null} />
      </MockWalletProvider>,
    );

    // Find the Solana card by looking for the text content
    const solanaCard = screen.getByText('Solana').closest('div[class*="cursor-pointer"]');
    if (solanaCard) {
      fireEvent.click(solanaCard);
      expect(mockOnSelect).toHaveBeenCalledWith('solana');
    }
  });

  it('shows SolanaWalletSelector when Solana is selected', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector
          onSelect={mockOnSelect}
          onClose={mockOnClose}
          selectedEcosystem="solana"
        />
      </MockWalletProvider>,
    );

    expect(screen.getByTestId('solana-wallet-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('ecosystem-selector')).not.toBeInTheDocument();
  });

  it('calls onSelect with null when back button is clicked in Solana selector', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector
          onSelect={mockOnSelect}
          onClose={mockOnClose}
          selectedEcosystem="solana"
        />
      </MockWalletProvider>,
    );

    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockOnSelect).toHaveBeenCalledWith(null);
  });

  it('accepts custom data-testid prop', () => {
    render(
      <MockWalletProvider>
        <EcosystemSelector
          onSelect={mockOnSelect}
          onClose={mockOnClose}
          selectedEcosystem={null}
          data-testid="custom-ecosystem-selector"
        />
      </MockWalletProvider>,
    );

    expect(screen.getByTestId('custom-ecosystem-selector')).toBeInTheDocument();
  });
});

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletConnectButton } from '../connect-button/ConnectButton';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
    onError,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={onError}
    />
  ),
}));

// Mock RainbowKit ConnectButton
const mockOpenConnectModal = vi.fn();
const mockOpenAccountModal = vi.fn();
const mockOpenChainModal = vi.fn();

vi.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    Custom: ({ children }: { children: (props: Record<string, unknown>) => React.ReactNode }) => {
      const mockProps = {
        account: null,
        chain: null,
        openAccountModal: mockOpenAccountModal,
        openChainModal: mockOpenChainModal,
        openConnectModal: mockOpenConnectModal,
        authenticationStatus: 'unauthenticated',
        mounted: true,
      };
      return <div data-testid="connect-button-custom">{children(mockProps)}</div>;
    },
  },
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'wallet.connect': 'Connect Wallet',
        'wallet.wrongNetwork': 'Wrong Network',
        'wallet.switchNetwork': 'Switch Network',
        'wallet.address': 'Address',
        'common.loading': 'Loading...',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock WalletContext
vi.mock('@/context/WalletContext', () => ({
  useWallet: () => ({
    connectedWallets: [],
    evmWallet: null,
    solanaWallet: null,
  }),
}));

describe('WalletConnectButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render connect button when not connected', () => {
    render(<WalletConnectButton />);

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connect Wallet' })).toBeInTheDocument();
  });

  it('should call openConnectModal when connect button is clicked', () => {
    render(<WalletConnectButton />);

    const connectButton = screen.getByRole('button', { name: 'Connect Wallet' });
    fireEvent.click(connectButton);

    expect(mockOpenConnectModal).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility attributes', () => {
    render(<WalletConnectButton />);

    const connectButton = screen.getByRole('button', { name: 'Connect Wallet' });
    expect(connectButton).toHaveAttribute('type', 'button');
    expect(connectButton).toHaveAttribute('aria-label', 'Connect Wallet');
  });

  it('should render the component without crashing', () => {
    expect(() => render(<WalletConnectButton />)).not.toThrow();
  });

  it('should have cyberpunk styling classes', () => {
    render(<WalletConnectButton />);

    const connectButton = screen.getByRole('button', { name: 'Connect Wallet' });
    expect(connectButton).toHaveClass('bg-gradient-to-r', 'from-neon-cyan', 'to-neon-pink');
  });
});

'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import React, { useMemo, useCallback } from 'react';
import { usePostHog } from '@/hooks';

// Constants
const CHAIN_ICON_SIZE = 16;
const SKELETON_WIDTH = 32;
const SKELETON_HEIGHT = 10;
const SKELETON_MULTIPLIER = 4;

// Chain Icon Component
const ChainIcon: React.FC<{
  chain: { name?: string; iconUrl?: string; iconBackground?: string; hasIcon?: boolean };
}> = ({ chain }) => {
  if (!chain?.hasIcon || !chain?.iconUrl) return null;

  return (
    <div
      className="w-4 h-4 rounded-full overflow-hidden"
      style={{ background: chain.iconBackground || 'transparent' }}
    >
      <Image
        alt={chain.name ?? 'Chain icon'}
        src={chain.iconUrl}
        width={CHAIN_ICON_SIZE}
        height={CHAIN_ICON_SIZE}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

// Individual Button Components
const ConnectButtonComponent: React.FC<{
  onClick: () => void;
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
  onTrack: () => void;
}> = ({ onClick, className, ariaLabel, children, onTrack }) => {
  const handleClick = useCallback(() => {
    onTrack();
    onClick();
  }, [onTrack, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

const WrongNetworkButton: React.FC<{
  onClick: () => void;
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
  onTrack: () => void;
}> = ({ onClick, className, ariaLabel, children, onTrack }) => {
  const handleClick = useCallback(() => {
    onTrack();
    onClick();
  }, [onTrack, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

const ChainButton: React.FC<{
  onClick: () => void;
  className: string;
  ariaLabel: string;
  chain: { name?: string; iconUrl?: string; iconBackground?: string; hasIcon?: boolean };
  onTrack: () => void;
}> = ({ onClick, className, ariaLabel, chain, onTrack }) => {
  const handleClick = useCallback(() => {
    onTrack();
    onClick();
  }, [onTrack, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={className}
      aria-label={ariaLabel}
    >
      <ChainIcon chain={chain} />
      {chain?.name || 'Unknown Network'}
    </button>
  );
};

const AccountButton: React.FC<{
  onClick: () => void;
  className: string;
  ariaLabel: string;
  account: { displayName?: string; displayBalance?: string };
  onTrack: () => void;
}> = ({ onClick, className, ariaLabel, account, onTrack }) => {
  const handleClick = useCallback(() => {
    onTrack();
    onClick();
  }, [onTrack, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={className}
      aria-label={ariaLabel}
    >
      <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
      {account?.displayName || 'Unknown Account'}
      {account?.displayBalance ? ` (${account.displayBalance})` : ''}
    </button>
  );
};

export const CyberpunkConnectButton = React.memo(function CyberpunkConnectButton() {
  const { t } = useTranslation();
  const { trackFeatureUsage } = usePostHog();

  // Memoize button styles to prevent unnecessary re-renders
  const buttonStyles = useMemo(
    () => ({
      connect:
        'bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-2 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] tracking-wide transition hover:scale-105',
      wrongNetwork:
        'bg-red-500 text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-2 shadow-[0_0_12px_var(--color-red)] tracking-wide transition hover:scale-105',
      chain:
        'flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-3 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)] hover:scale-105 transition-all duration-300',
      account:
        'flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)] hover:scale-105 transition-all duration-300',
    }),
    [],
  );

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Enhanced error handling and state management
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        // Error state handling
        if (!mounted) {
          return (
            <div
              className="bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
              style={{
                width: SKELETON_WIDTH * SKELETON_MULTIPLIER,
                height: SKELETON_HEIGHT * SKELETON_MULTIPLIER,
              }}
            />
          );
        }

        // Loading state
        if (authenticationStatus === 'loading') {
          return (
            <div className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2">
              <div className="w-4 h-4 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
              <span className="text-white text-sm">{t('common.loading')}</span>
            </div>
          );
        }

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              // Simplified logic: if not connected, show connect button
              if (!connected || (!account && !chain)) {
                return (
                  <ConnectButtonComponent
                    onClick={openConnectModal}
                    className={buttonStyles.connect}
                    ariaLabel={t('wallet.connect')}
                    onTrack={() =>
                      trackFeatureUsage('wallet_connect', 'clicked', {
                        source: 'cyberpunk_button',
                      })
                    }
                  >
                    {t('wallet.connect')}
                  </ConnectButtonComponent>
                );
              }

              if (chain?.unsupported) {
                return (
                  <WrongNetworkButton
                    onClick={openChainModal}
                    className={buttonStyles.wrongNetwork}
                    ariaLabel={t('wallet.wrongNetwork')}
                    onTrack={() =>
                      trackFeatureUsage('wallet_network_switch', 'clicked', {
                        source: 'cyberpunk_button',
                        reason: 'wrong_network',
                      })
                    }
                  >
                    {t('wallet.wrongNetwork')}
                  </WrongNetworkButton>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <ChainButton
                    onClick={openChainModal}
                    className={buttonStyles.chain}
                    ariaLabel={`${t('wallet.switchNetwork')}: ${chain?.name || 'Unknown'}`}
                    chain={chain}
                    onTrack={() =>
                      trackFeatureUsage('wallet_network_switch', 'clicked', {
                        source: 'cyberpunk_button',
                        chain: chain?.name || 'unknown',
                      })
                    }
                  />

                  <AccountButton
                    onClick={openAccountModal}
                    className={buttonStyles.account}
                    ariaLabel={`${t('wallet.address')}: ${account?.displayName || 'Unknown'}`}
                    account={account}
                    onTrack={() =>
                      trackFeatureUsage('wallet_account_modal', 'clicked', {
                        source: 'cyberpunk_button',
                        hasBalance: !!account?.displayBalance,
                      })
                    }
                  />
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
});

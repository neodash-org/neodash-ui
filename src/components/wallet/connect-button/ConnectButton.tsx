'use client';

import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { usePostHog } from '@/hooks';
import { useWallet } from '@/context/WalletContext';
import { BaseConnectButton } from './BaseConnectButton';
import { WrongNetworkButton } from './WrongNetworkButton';
import { ChainButton } from './ChainButton';
import { AccountButton } from './AccountButton';

// Constants
const SKELETON_WIDTH = 32;
const SKELETON_HEIGHT = 10;
const SKELETON_MULTIPLIER = 4;

export const WalletConnectButton = React.memo(function WalletConnectButton() {
  const { t } = useTranslation();
  const { trackFeatureUsage } = usePostHog();
  const { connectedWallets, solanaWallet } = useWallet();

  // CTO-level debugging logs
  console.log('🔍 WalletConnectButton Render:', {
    connectedWallets: connectedWallets.length,
    solanaWallet: !!solanaWallet,
    solanaAddress: solanaWallet?.address,
    timestamp: new Date().toISOString(),
  });

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
    <RainbowKitConnectButton.Custom>
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
        const evmConnected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        // Check if any wallet is connected (EVM or Solana)
        const hasAnyConnectedWallet = evmConnected || connectedWallets.length > 0;

        // CTO-level debugging logs for RainbowKit state
        console.log('🔍 RainbowKit State:', {
          evmConnected,
          account: !!account,
          chain: chain?.name,
          authenticationStatus,
          mounted,
          ready,
          hasAnyConnectedWallet,
          connectedWalletsCount: connectedWallets.length,
          solanaWalletExists: !!solanaWallet,
          timestamp: new Date().toISOString(),
        });

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
              // CTO-level debugging for decision logic
              console.log('🔍 Decision Logic:', {
                hasAnyConnectedWallet,
                evmConnected,
                solanaWallet: !!solanaWallet,
                decision: !hasAnyConnectedWallet
                  ? 'SHOW_CONNECT'
                  : !evmConnected && solanaWallet
                    ? 'SHOW_SOLANA_ONLY'
                    : 'SHOW_EVM_MANAGEMENT',
                timestamp: new Date().toISOString(),
              });

              // Show connect button only if no wallets are connected
              if (!hasAnyConnectedWallet) {
                return (
                  <BaseConnectButton
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
                  </BaseConnectButton>
                );
              }

              // If only Solana is connected (no EVM), show a different UI
              if (!evmConnected && solanaWallet) {
                return (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)]">
                      <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                      <span>Solana Connected</span>
                    </div>
                    <BaseConnectButton
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
                    </BaseConnectButton>
                  </div>
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

              // EVM connected (with or without Solana)
              return (
                <div className="flex items-center gap-3">
                  <ChainButton
                    onClick={openChainModal}
                    className={buttonStyles.chain}
                    ariaLabel={`${t('wallet.switchNetwork')}: ${chain?.name || 'Unknown'}`}
                    chain={
                      chain || { name: 'Unknown', iconUrl: '', iconBackground: '', hasIcon: false }
                    }
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
                    account={account || { displayName: 'Unknown', displayBalance: '' }}
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
    </RainbowKitConnectButton.Custom>
  );
});

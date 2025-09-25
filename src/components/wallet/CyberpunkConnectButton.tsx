'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import React, { useMemo } from 'react';

export const CyberpunkConnectButton = React.memo(function CyberpunkConnectButton() {
  const { t } = useTranslation();

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
            <div className="w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
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
              // Error handling for missing account/chain data
              if (!account && !chain) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={buttonStyles.connect}
                    aria-label={t('wallet.connect')}
                  >
                    {t('wallet.connect')}
                  </button>
                );
              }

              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={buttonStyles.connect}
                    aria-label={t('wallet.connect')}
                  >
                    {t('wallet.connect')}
                  </button>
                );
              }

              if (chain?.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={buttonStyles.wrongNetwork}
                    aria-label={t('wallet.wrongNetwork')}
                  >
                    {t('wallet.wrongNetwork')}
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={buttonStyles.chain}
                    aria-label={`${t('wallet.switchNetwork')}: ${chain?.name || 'Unknown'}`}
                  >
                    {chain?.hasIcon && chain?.iconUrl && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden"
                        style={{ background: chain.iconBackground }}
                      >
                        <Image
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          width={16}
                          height={16}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback for broken chain icons
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    {chain?.name || 'Unknown Network'}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className={buttonStyles.account}
                    aria-label={`${t('wallet.address')}: ${account?.displayName || 'Unknown'}`}
                  >
                    <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                    {account?.displayName || 'Unknown Account'}
                    {account?.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
});

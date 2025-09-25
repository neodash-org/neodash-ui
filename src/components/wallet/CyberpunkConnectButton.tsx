'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export function CyberpunkConnectButton() {
  const { t } = useTranslation();

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
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

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
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-r from-neon-cyan to-neon-pink text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-2 shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] tracking-wide transition hover:scale-105"
                  >
                    {t('wallet.connect')}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 text-white border-none rounded-full font-[var(--font-cyberpunk)] px-6 py-2 shadow-[0_0_12px_var(--color-red)] tracking-wide transition hover:scale-105"
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
                    className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-3 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)] hover:scale-105 transition-all duration-300"
                  >
                    {chain.hasIcon && chain.iconUrl && (
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
                        />
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-cyan)] hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

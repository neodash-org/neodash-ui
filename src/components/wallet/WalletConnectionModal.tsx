import React, { useState } from 'react';
import { Card, Button, Separator } from '@/design-system/components';
import { useWallet } from '@/lib/wallet/hooks';
import { WalletType } from '@/lib/wallet/types';
import EcosystemSelector from './EcosystemSelector';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'usehooks-ts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

const WalletConnectionModal: React.FC = () => {
  const { t } = useTranslation();
  const { isModalOpen, closeModal, openModal, error, setError } = useWallet();
  const [selectedEcosystem, setSelectedEcosystem] = useState<WalletType | null>(null);
  const { disconnect } = useDisconnect();
  const {
    publicKey: solanaPublicKey,
    connected: isSolanaConnected,
    wallet: solanaWallet,
    disconnect: disconnectSolana,
  } = useSolanaWallet();
  const { width } = useWindowSize();
  const isDesktop = width >= 768; // md breakpoint
  const [isRainbowKitOpen, setIsRainbowKitOpen] = useState(false);
  const [switchClicked, setSwitchClicked] = useState(false);

  // Observe DOM to detect RainbowKit modal presence so we can disable pointer events on our dialog
  React.useEffect(() => {
    const check = () => {
      const rkDialog = document.querySelector('[data-rk] [role="dialog"]');
      const wasOpen = isRainbowKitOpen;
      const isNowOpen = Boolean(rkDialog);

      setIsRainbowKitOpen(isNowOpen);

      // If RainbowKit just closed and we clicked switch, reopen our modal
      if (wasOpen && !isNowOpen && switchClicked) {
        setSwitchClicked(false);
        setTimeout(() => {
          openModal();
        }, 100);
      }
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isRainbowKitOpen, switchClicked, openModal]);

  // Toggle a body class so we can globally adjust stacking/pointer-events while RainbowKit is open
  React.useEffect(() => {
    if (isRainbowKitOpen) {
      document.body.classList.add('rk-open');
    } else {
      document.body.classList.remove('rk-open');
    }
  }, [isRainbowKitOpen]);

  const handleEcosystemSelect = (type: WalletType | null) => {
    setSelectedEcosystem(type);
    setError(null);
  };

  const handleClose = () => {
    setSelectedEcosystem(null);
    setError(null);
    closeModal();
  };

  const renderContent = (isMobile: boolean = false) => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const evmConnected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          // If EVM is connected, show connection status and management options
          if (evmConnected) {
            return (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('wallet.manageWallets')}
                  </p>
                </div>

                {/* EVM Connection Status */}
                <Card
                  className="dark:bg-gradient-to-br dark:from-neon-cyan/5 dark:to-neon-pink/5 dark:border-neon-cyan/30 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]"
                  data-testid="evm-connection-status"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🔷</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                            {t('wallet.ethereumConnected')}
                          </h4>
                          <div className="w-2 h-2 bg-green-500 dark:bg-neon-green rounded-full shadow-[0_0_4px_var(--color-green-500)] dark:shadow-[0_0_4px_var(--color-neon-green)]"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm text-gray-600 dark:text-gray-300 font-mono ${isMobile ? 'truncate' : 'break-all'} flex-1`}
                          >
                            {isMobile
                              ? `${account.address.slice(0, 8)}...${account.address.slice(-8)}`
                              : account.address}
                          </p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(account.address);
                            }}
                            className="w-6 h-6 rounded bg-green-100 dark:bg-neon-green/10 border border-green-300 dark:border-neon-green/30 hover:bg-green-200 dark:hover:bg-neon-green/20 hover:border-green-400 dark:hover:border-neon-green hover:shadow-[0_0_8px_var(--color-green-500)] dark:hover:shadow-[0_0_8px_var(--color-neon-green)] transition-all duration-300 flex items-center justify-center flex-shrink-0"
                            data-testid="copy-address-icon"
                          >
                            <svg
                              className="w-3 h-3 text-green-600 dark:text-neon-green"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: 2 rows (Switch+Copy, Disconnect), Desktop: Horizontal */}
                    <div className={isMobile ? 'space-y-2' : 'flex gap-2'}>
                      {isMobile ? (
                        <>
                          {/* First row: Switch Network only */}
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => {
                              setSwitchClicked(true);
                              closeModal();
                              setTimeout(() => {
                                openChainModal();
                              }, 0);
                            }}
                            className="w-full rounded-none border-b-4 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
                            data-testid="switch-network-button"
                          >
                            {t('wallet.switchNetwork')}
                          </Button>
                          {/* Second row: Disconnect */}
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => {
                              disconnect();
                              handleClose();
                            }}
                            className="w-full rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105"
                            data-testid="disconnect-button"
                          >
                            {t('wallet.disconnect')}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSwitchClicked(true);
                              closeModal();
                              setTimeout(() => {
                                openChainModal();
                              }, 0);
                            }}
                            className="flex-1 rounded-none border-b-4 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
                            data-testid="switch-network-button"
                          >
                            {t('wallet.switchNetwork')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              disconnect();
                              handleClose();
                            }}
                            className="flex-1 rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105"
                            data-testid="disconnect-button"
                          >
                            {t('wallet.disconnect')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>

                <Separator />

                {/* Solana Wallet Management */}
                {isSolanaConnected && solanaPublicKey && (
                  <>
                    <Card
                      className="dark:bg-gradient-to-br dark:from-neon-pink/5 dark:to-neon-cyan/5 dark:border-neon-pink/30 dark:shadow-[0_0_16px_var(--color-neon-pink-44)]"
                      data-testid="solana-connection-status"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">🟣</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                                {t('wallet.solanaConnected')}
                              </h4>
                              <div className="w-2 h-2 bg-green-500 dark:bg-neon-green rounded-full shadow-[0_0_4px_var(--color-green-500)] dark:shadow-[0_0_4px_var(--color-neon-green)]"></div>
                            </div>
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm text-gray-600 dark:text-gray-300 font-mono ${isMobile ? 'truncate' : 'break-all'} flex-1`}
                              >
                                {isMobile
                                  ? `${solanaPublicKey.toBase58().slice(0, 8)}...${solanaPublicKey.toBase58().slice(-8)}`
                                  : solanaPublicKey.toBase58()}
                              </p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(solanaPublicKey.toBase58());
                                }}
                                className="w-6 h-6 rounded bg-green-100 dark:bg-neon-green/10 border border-green-300 dark:border-neon-green/30 hover:bg-green-200 dark:hover:bg-neon-green/20 hover:border-green-400 dark:hover:border-neon-green hover:shadow-[0_0_8px_var(--color-green-500)] dark:hover:shadow-[0_0_8px_var(--color-neon-green)] transition-all duration-300 flex items-center justify-center flex-shrink-0"
                                data-testid="copy-solana-address-icon"
                              >
                                <svg
                                  className="w-3 h-3 text-green-600 dark:text-neon-green"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {solanaWallet?.adapter.name || 'Solana Wallet'}
                            </p>
                          </div>
                        </div>

                        {/* Mobile: 2 rows (Disconnect), Desktop: Horizontal */}
                        <div className={isMobile ? 'space-y-2' : 'flex gap-2'}>
                          <Button
                            variant="outline"
                            size={isMobile ? 'md' : 'sm'}
                            onClick={() => {
                              disconnectSolana();
                              handleClose();
                            }}
                            className={`${isMobile ? 'w-full' : 'flex-1'} rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105`}
                            data-testid="disconnect-solana-button"
                          >
                            {t('wallet.disconnect')}
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Separator />
                  </>
                )}

                {/* Additional Ecosystems - only show if not all ecosystems are connected */}
                {(!evmConnected || !isSolanaConnected) && (
                  <div>
                    <EcosystemSelector
                      onSelect={handleEcosystemSelect}
                      onClose={handleClose}
                      selectedEcosystem={selectedEcosystem}
                      data-testid="additional-ecosystem-selector"
                      hideConnectedEcosystems={true}
                      evmConnected={evmConnected}
                    />
                  </div>
                )}
              </div>
            );
          }

          // If not connected, show ecosystem selection
          return (
            <EcosystemSelector
              onSelect={handleEcosystemSelect}
              onClose={handleClose}
              selectedEcosystem={selectedEcosystem}
              data-testid="ecosystem-selector"
              evmConnected={evmConnected}
            />
          );
        }}
      </ConnectButton.Custom>
    );
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const evmConnected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (isDesktop) {
          return (
            <Dialog modal={false} open={isModalOpen} onOpenChange={closeModal}>
              <DialogContent
                className={`sm:max-w-md dark:bg-bg-card/80 dark:border-neon-cyan/30 dark:shadow-[0_0_32px_var(--color-neon-cyan-88),0_0_64px_var(--color-neon-pink-44)] dark:backdrop-blur-lg ${isRainbowKitOpen ? 'pointer-events-none' : ''}`}
                aria-hidden={isRainbowKitOpen || undefined}
                aria-describedby="wallet-modal-description"
              >
                <DialogHeader>
                  <DialogTitle className="dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:text-white dark:text-2xl dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
                    {evmConnected ? t('wallet.walletManagement') : t('wallet.connect')}
                  </DialogTitle>
                  <p id="wallet-modal-description" className="sr-only">
                    {evmConnected ? t('wallet.manageWallets') : t('wallet.selectEcosystem')}
                  </p>
                </DialogHeader>
                {error && (
                  <Card className="mb-4 border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 dark:shadow-[0_0_16px_var(--color-red-44)]">
                    <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 dark:drop-shadow-[0_0_4px_var(--color-red)]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                        {error}
                      </span>
                    </div>
                  </Card>
                )}
                {renderContent(false)}
              </DialogContent>
            </Dialog>
          );
        }

        return (
          <Drawer open={isModalOpen} onOpenChange={closeModal}>
            <DrawerContent
              className={`dark:bg-bg-card/95 dark:border-neon-cyan/30 dark:shadow-[0_0_32px_var(--color-neon-cyan-88),0_0_64px_var(--color-neon-pink-44)] max-h-[50vh] sm:max-h-[60vh] flex flex-col ${isRainbowKitOpen ? 'pointer-events-none' : ''}`}
              aria-hidden={isRainbowKitOpen || undefined}
              aria-describedby="wallet-drawer-description"
            >
              <DrawerHeader className="text-left relative pr-12 flex-shrink-0">
                <button
                  onClick={handleClose}
                  className="absolute top-0 right-4 w-8 h-8 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300"
                  data-testid="drawer-close-button"
                  aria-label={t('actions.closeMenu')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <DrawerTitle className="dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:text-white dark:text-2xl dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
                  {evmConnected ? t('wallet.walletManagement') : t('wallet.connect')}
                </DrawerTitle>
                <p id="wallet-drawer-description" className="sr-only">
                  {evmConnected ? t('wallet.manageWallets') : t('wallet.selectEcosystem')}
                </p>
              </DrawerHeader>
              <div className="px-4 flex-1 overflow-y-auto">
                {error && (
                  <Card className="mb-4 border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 dark:shadow-[0_0_16px_var(--color-red-44)]">
                    <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 dark:drop-shadow-[0_0_4px_var(--color-red)]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
                        {error}
                      </span>
                    </div>
                  </Card>
                )}
                {renderContent(true)}
              </div>
            </DrawerContent>
          </Drawer>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectionModal;

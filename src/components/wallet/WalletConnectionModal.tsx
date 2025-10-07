import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'usehooks-ts';
import { AUTH_STATUS } from '@/lib/wallet/auth-constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useWalletModal, ErrorDisplay, WalletConnectionView, WalletManagementView } from './modal';

const WalletConnectionModal: React.FC = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isDesktop = width >= 768; // md breakpoint

  const {
    isModalOpen,
    selectedEcosystem,
    isManagementMode,
    isRainbowKitOpen,
    error,
    evmWallet,
    solanaWallet,
    handleEcosystemSelect,
    handleClose,
    setSwitchClicked,
  } = useWalletModal();

  const closeModal = handleClose;

  const renderContent = (isMobile: boolean = false) => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== AUTH_STATUS.LOADING;
          const evmConnectedFromRainbowKit =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === AUTH_STATUS.AUTHENTICATED);

          // Use context state as primary source of truth
          const evmConnected = Boolean(evmConnectedFromRainbowKit && !!evmWallet);
          const isSolanaConnectedFromContext = Boolean(solanaWallet);

          const handleSwitchNetwork = () => {
            setSwitchClicked(true);
            handleClose();
            setTimeout(() => {
              openChainModal();
            }, 0);
          };

          // Show wallet management only if explicitly in management mode AND wallets are connected
          if (isManagementMode && (evmConnected || isSolanaConnectedFromContext)) {
            return (
              <WalletManagementView
                evmConnected={evmConnected}
                evmAccount={account ?? null}
                solanaConnected={isSolanaConnectedFromContext}
                solanaWallet={solanaWallet ?? null}
                onEcosystemSelect={handleEcosystemSelect}
                onClose={handleClose}
                onSwitchNetwork={handleSwitchNetwork}
                isMobile={isMobile}
              />
            );
          }

          // If not connected, show ecosystem selection
          return (
            <WalletConnectionView
              selectedEcosystem={selectedEcosystem}
              onEcosystemSelect={handleEcosystemSelect}
              onClose={handleClose}
              evmConnected={evmConnected}
            />
          );
        }}
      </ConnectButton.Custom>
    );
  };

  return (
    <ConnectButton.Custom>
      {() => {
        if (isDesktop) {
          return (
            <Dialog modal={false} open={isModalOpen} onOpenChange={closeModal}>
              <DialogContent
                data-testid="wallet-connection-modal"
                className={`sm:max-w-md dark:bg-bg-card/80 dark:border-neon-cyan/30 dark:shadow-[0_0_32px_var(--color-neon-cyan-88),0_0_64px_var(--color-neon-pink-44)] dark:backdrop-blur-lg ${isRainbowKitOpen ? 'pointer-events-none' : ''}`}
                aria-hidden={isRainbowKitOpen || undefined}
                aria-describedby="wallet-modal-description"
              >
                <DialogHeader>
                  <DialogTitle className="dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:text-white dark:text-2xl dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
                    {isManagementMode ? t('wallet.walletManagement') : t('wallet.connect')}
                  </DialogTitle>
                  <p id="wallet-modal-description" className="sr-only">
                    {isManagementMode ? t('wallet.manageWallets') : t('wallet.selectEcosystem')}
                  </p>
                </DialogHeader>
                <ErrorDisplay error={error} />
                {renderContent(false)}
              </DialogContent>
            </Dialog>
          );
        }

        return (
          <Drawer open={isModalOpen} onOpenChange={closeModal}>
            <DrawerContent
              data-testid="wallet-connection-modal"
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
                  {isManagementMode ? t('wallet.walletManagement') : t('wallet.connect')}
                </DrawerTitle>
                <p id="wallet-drawer-description" className="sr-only">
                  {isManagementMode ? t('wallet.manageWallets') : t('wallet.selectEcosystem')}
                </p>
              </DrawerHeader>
              <div className="px-4 flex-1 overflow-y-auto">
                <ErrorDisplay error={error} />
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

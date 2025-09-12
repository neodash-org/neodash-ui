import React, { useState } from 'react';
import { Card, Button, Separator } from '@/design-system/components';
import { useWallet } from '@/lib/wallet/hooks';
import { WalletType } from '@/lib/wallet/types';
import EcosystemSelector from './EcosystemSelector';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'usehooks-ts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const WalletConnectionModal: React.FC = () => {
  const { t } = useTranslation();
  const { isModalOpen, closeModal, error, setError } = useWallet();
  const [selectedEcosystem, setSelectedEcosystem] = useState<WalletType | null>(null);
  const { disconnect } = useDisconnect();
  const { width } = useWindowSize();
  const isDesktop = width >= 768; // md breakpoint

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
                          <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                        </div>
                        <p
                          className={`text-sm text-gray-600 dark:text-gray-300 font-mono ${isMobile ? 'truncate' : 'break-all'}`}
                        >
                          {isMobile
                            ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                            : account.address}
                        </p>
                      </div>
                    </div>

                    {/* Mobile: Stack buttons vertically, Desktop: Horizontal */}
                    <div className={isMobile ? 'space-y-2' : 'flex gap-2'}>
                      <Button
                        variant="outline"
                        size={isMobile ? 'md' : 'sm'}
                        onClick={() => {
                          console.log('Switch Network clicked, openChainModal:', openChainModal);
                          openChainModal();
                        }}
                        className={`w-full ${isMobile ? '' : 'flex-1'} rounded-none border-b-4 dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105`}
                        data-testid="switch-network-button"
                      >
                        {t('wallet.switchNetwork')}
                      </Button>
                      <Button
                        variant="outline"
                        size={isMobile ? 'md' : 'sm'}
                        onClick={() => {
                          navigator.clipboard.writeText(account.address);
                          console.log(t('wallet.addressCopied'));
                        }}
                        className={`w-full ${isMobile ? '' : 'flex-1'} rounded-none border-b-4 dark:border-neon-green/30 dark:hover:border-neon-green dark:hover:shadow-[0_0_8px_var(--color-neon-green)] dark:hover:scale-105`}
                        data-testid="copy-address-button"
                      >
                        {t('wallet.copyAddress')}
                      </Button>
                      <Button
                        variant="outline"
                        size={isMobile ? 'md' : 'sm'}
                        onClick={() => {
                          console.log('Disconnecting wallet');
                          disconnect();
                          handleClose();
                        }}
                        className={`w-full ${isMobile ? '' : 'flex-1'} rounded-none border-b-4 dark:border-neon-red/30 dark:hover:border-neon-red dark:hover:shadow-[0_0_8px_var(--color-neon-red)] dark:hover:scale-105`}
                        data-testid="disconnect-button"
                      >
                        {t('wallet.disconnect')}
                      </Button>
                    </div>
                  </div>
                </Card>

                <Separator />

                {/* Additional Ecosystems */}
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
            <Dialog open={isModalOpen} onOpenChange={closeModal}>
              <DialogContent className="sm:max-w-md dark:bg-bg-card/80 dark:border-neon-cyan/30 dark:shadow-[0_0_32px_var(--color-neon-cyan-88),0_0_64px_var(--color-neon-pink-44)] dark:backdrop-blur-lg">
                <DialogHeader>
                  <DialogTitle className="dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:text-white dark:text-2xl dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
                    {evmConnected ? t('wallet.walletManagement') : t('wallet.connect')}
                  </DialogTitle>
                  <DialogDescription className="dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]">
                    {evmConnected ? t('wallet.manageWallets') : t('wallet.chooseEcosystem')}
                  </DialogDescription>
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
            <DrawerContent className="dark:bg-bg-card/80 dark:border-neon-cyan/30 dark:shadow-[0_0_32px_var(--color-neon-cyan-88),0_0_64px_var(--color-neon-pink-44)]">
              <DrawerHeader className="text-left">
                <DrawerTitle className="dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:text-white dark:text-2xl dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
                  {evmConnected ? t('wallet.walletManagement') : t('wallet.connect')}
                </DrawerTitle>
                <DrawerDescription className="dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]">
                  {evmConnected ? t('wallet.manageWallets') : t('wallet.chooseEcosystem')}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
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
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105 dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]"
                  >
                    {t('common.close')}
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectionModal;

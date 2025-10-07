import { useState, useEffect } from 'react';
import { useWallet } from '@/lib/wallet/hooks';
import { WalletType } from '@/lib/wallet/types';

export function useWalletModal() {
  const { isModalOpen, closeModal, openModal, error, setError, evmWallet, solanaWallet } =
    useWallet();
  const [selectedEcosystem, setSelectedEcosystem] = useState<WalletType | null>(null);
  const [isManagementMode, setIsManagementMode] = useState(false);
  const [isRainbowKitOpen, setIsRainbowKitOpen] = useState(false);
  const [switchClicked, setSwitchClicked] = useState(false);

  // Observe DOM to detect RainbowKit modal presence so we can disable pointer events on our dialog
  useEffect(() => {
    const check = () => {
      const rkDialog = document.querySelector('[data-rk] [role="dialog"]');
      const wasOpen = isRainbowKitOpen;
      const isNowOpen = Boolean(rkDialog);

      setIsRainbowKitOpen(isNowOpen);

      // If RainbowKit just closed and we clicked switch, reopen our modal in management mode
      if (wasOpen && !isNowOpen && switchClicked) {
        setSwitchClicked(false);
        setIsManagementMode(true); // Keep management mode when reopening
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
  useEffect(() => {
    if (isRainbowKitOpen) {
      document.body.classList.add('rk-open');
    } else {
      document.body.classList.remove('rk-open');
    }
  }, [isRainbowKitOpen]);

  // Listen for management modal event
  useEffect(() => {
    const handleOpenManagement = () => {
      setIsManagementMode(true);
    };

    window.addEventListener('openWalletManagement', handleOpenManagement);
    return () => window.removeEventListener('openWalletManagement', handleOpenManagement);
  }, []);

  // Auto-set management mode if wallets are connected when modal opens
  useEffect(() => {
    if (isModalOpen) {
      // If we have connected wallets, automatically set management mode
      const hasConnectedWallets = evmWallet || solanaWallet;
      if (hasConnectedWallets && !isManagementMode) {
        console.log('Auto-setting management mode because wallets are connected');
        setIsManagementMode(true);
      }
    } else {
      // Reset when modal closes
      setIsManagementMode(false);
    }
  }, [isModalOpen, evmWallet, solanaWallet, isManagementMode]);

  const handleEcosystemSelect = (type: WalletType | null) => {
    setSelectedEcosystem(type);
    setError(null);
  };

  const handleClose = () => {
    setSelectedEcosystem(null);
    setIsManagementMode(false);
    setError(null);
    closeModal();
  };

  return {
    // State
    isModalOpen,
    selectedEcosystem,
    isManagementMode,
    isRainbowKitOpen,
    switchClicked,
    error,
    evmWallet,
    solanaWallet,

    // Actions
    handleEcosystemSelect,
    handleClose,
    setSwitchClicked,
    setIsManagementMode,
  };
}

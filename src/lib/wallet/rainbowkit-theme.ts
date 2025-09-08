import { Theme } from '@rainbow-me/rainbowkit';

export const cyberpunkTheme: Theme = {
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  colors: {
    accentColor: '#00fff0', // neon-cyan
    accentColorForeground: '#000000',
    actionButtonBorder: 'rgba(0, 255, 240, 0.3)',
    actionButtonBorderMobile: 'rgba(0, 255, 240, 0.3)',
    actionButtonSecondaryBackground: 'rgba(0, 255, 240, 0.1)',
    closeButton: '#00fff0',
    closeButtonBackground: 'rgba(0, 255, 240, 0.1)',
    connectButtonBackground: 'linear-gradient(135deg, #00fff0, #ff3cac)',
    connectButtonBackgroundError: '#ff3cac',
    connectButtonInnerBackground: 'rgba(0, 0, 0, 0.8)',
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#39ff14', // neon-green
    downloadBottomCardBackground: 'rgba(0, 0, 0, 0.8)',
    downloadTopCardBackground: 'rgba(0, 0, 0, 0.9)',
    error: '#ff3cac',
    generalBorder: 'rgba(0, 255, 240, 0.2)',
    generalBorderDim: 'rgba(0, 255, 240, 0.1)',
    menuItemBackground: 'rgba(0, 0, 0, 0.8)',
    modalBackdrop: 'rgba(0, 0, 0, 0.8)',
    modalBackground: 'rgba(0, 0, 0, 0.9)',
    modalBorder: 'rgba(0, 255, 240, 0.3)',
    modalText: '#ffffff',
    modalTextDim: 'rgba(255, 255, 255, 0.7)',
    modalTextSecondary: 'rgba(255, 255, 255, 0.5)',
    profileAction: 'rgba(0, 255, 240, 0.1)',
    profileActionHover: 'rgba(0, 255, 240, 0.2)',
    profileForeground: '#ffffff',
    selectedOptionBorder: '#00fff0',
    standby: '#fff700', // neon-yellow
  },
  fonts: {
    body: 'var(--font-cyberpunk)',
  },
  radii: {
    actionButton: '12px',
    connectButton: '24px',
    menuButton: '12px',
    modal: '16px',
    modalMobile: '16px',
  },
  shadows: {
    connectButton: '0 0 12px rgba(0, 255, 240, 0.5), 0 0 24px rgba(255, 60, 172, 0.3)',
    dialog: '0 0 32px rgba(0, 255, 240, 0.3)',
    profileDetailsAction: '0 0 8px rgba(0, 255, 240, 0.3)',
    selectedOption: '0 0 16px rgba(0, 255, 240, 0.4)',
    selectedWallet: '0 0 16px rgba(0, 255, 240, 0.4)',
    walletLogo: '0 0 8px rgba(0, 255, 240, 0.3)',
  },
};

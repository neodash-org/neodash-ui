import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { Button } from '@/design-system/components';
import { usePostHog } from '@/hooks';
import SolanaWalletSelector from './SolanaWalletSelector';
import { Modal } from '@/design-system/components';

const SolanaWalletConnector: React.FC = () => {
  const { trackFeatureUsage } = usePostHog();
  const { wallets, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usable = wallets.filter(
    (w) =>
      w.readyState === WalletReadyState.Installed || w.readyState === WalletReadyState.Loadable,
  );

  const address = publicKey?.toBase58() ?? '';

  if (usable.length === 0) {
    return (
      <Button
        onClick={() => {
          trackFeatureUsage('solana_wallet', 'install_phantom_clicked', { location: 'header' });
          window.open('https://phantom.app/download', '_blank');
        }}
        variant="primary"
        size="sm"
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none rounded-full font-[var(--font-cyberpunk)] px-4 py-2 shadow-[0_0_8px_var(--color-purple-600),0_0_16px_var(--color-pink-600)] tracking-wide transition hover:scale-105"
      >
        Install Phantom
      </Button>
    );
  }

  if (!publicKey) {
    return (
      <Button
        onClick={() => {
          trackFeatureUsage('solana_wallet', 'connection_attempted', { location: 'header' });
          setVisible(true);
        }}
        variant="primary"
        size="sm"
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none rounded-full font-[var(--font-cyberpunk)] px-4 py-2 shadow-[0_0_8px_var(--color-purple-600),0_0_16px_var(--color-pink-600)] tracking-wide transition hover:scale-105"
      >
        Solana Wallet
      </Button>
    );
  }

  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <>
      <Button
        onClick={() => {
          trackFeatureUsage('solana_wallet', 'account_modal_opened', { location: 'header' });
          setIsModalOpen(true);
        }}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-bg-card/70 border border-white/10 rounded-full px-4 py-2 text-white font-[var(--font-cyberpunk)] tracking-wide shadow-[0_0_8px_var(--color-neon-pink)] hover:scale-105 transition-all duration-300"
      >
        <div className="w-2 h-2 bg-neon-pink rounded-full shadow-[0_0_4px_var(--color-neon-pink)]"></div>
        <span className="text-sm">{shortAddress}</span>
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solana Wallet"
        size="md"
        className="max-w-md"
      >
        <SolanaWalletSelector
          onBack={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default SolanaWalletConnector;

import React from 'react';
import { Card, Button, Separator } from '@/design-system/components';
import { WalletType } from '@/lib/wallet/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import SolanaWalletSelector from './SolanaWalletSelector';

interface EcosystemSelectorProps {
  onSelect: (type: WalletType | null) => void;
  onClose: () => void;
  selectedEcosystem?: WalletType | null;
  'data-testid'?: string;
  hideConnectedEcosystems?: boolean;
  evmConnected?: boolean;
}

const EcosystemSelector: React.FC<EcosystemSelectorProps> = ({
  onSelect,
  onClose,
  selectedEcosystem,
  'data-testid': dataTestId,
  hideConnectedEcosystems = false,
  evmConnected = false,
}) => {
  const { publicKey: solanaPublicKey } = useWallet();
  const allEcosystems = [
    {
      type: 'evm' as WalletType,
      name: 'Ethereum',
      description: 'Connect to Ethereum and EVM-compatible chains',
      icon: '🔷',
      wallets: ['MetaMask', 'Rainbow', 'Coinbase', 'Trust'],
      color:
        'bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-cyan-900/20 border-blue-200 dark:border-neon-cyan/40 dark:shadow-[0_0_16px_var(--color-neon-cyan-44)]',
      textColor:
        'text-blue-700 dark:text-neon-cyan dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]',
    },
    {
      type: 'solana' as WalletType,
      name: 'Solana',
      description: 'Connect to Solana blockchain',
      icon: '🟣',
      wallets: ['Phantom', 'Solflare'],
      color:
        'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/20 border-purple-200 dark:border-neon-pink/40 dark:shadow-[0_0_16px_var(--color-neon-pink-44)]',
      textColor:
        'text-purple-700 dark:text-neon-pink dark:drop-shadow-[0_0_4px_var(--color-neon-pink)]',
    },
  ];

  // Filter out connected ecosystems if hideConnectedEcosystems is true
  const ecosystems = allEcosystems.filter((ecosystem) => {
    if (!hideConnectedEcosystems) return true;

    if (ecosystem.type === 'evm') {
      return !evmConnected;
    }

    if (ecosystem.type === 'solana') {
      return !solanaPublicKey;
    }

    return true;
  });

  // If Solana ecosystem is selected, show Solana wallet selector
  if (selectedEcosystem === 'solana') {
    return (
      <SolanaWalletSelector
        onBack={() => onSelect(null)}
        onClose={onClose}
        data-testid="solana-wallet-selector"
      />
    );
  }

  return (
    <div className="space-y-4" data-testid={dataTestId || 'ecosystem-selector'}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)] mb-2">
          Choose Your Ecosystem
        </h3>
      </div>

      <div className="grid gap-3">
        {ecosystems.map((ecosystem) => {
          if (ecosystem.type === 'evm') {
            return (
              <ConnectButton.Custom key={ecosystem.type}>
                {({
                  account,
                  chain,
                  openConnectModal,
                  openAccountModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading';
                  const isEvmConnected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');

                  return (
                    <Card
                      className={`${ecosystem.color} border-2 hover:shadow-md dark:hover:shadow-[0_0_24px_var(--color-neon-cyan-66),0_0_32px_var(--color-neon-pink-44)] transition-all duration-300 cursor-pointer dark:hover:scale-[1.02] dark:hover:border-neon-cyan/60`}
                      onClick={isEvmConnected ? openAccountModal : openConnectModal}
                      hover
                      data-testid="evm-ecosystem-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{ecosystem.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-semibold dark:font-[var(--font-cyberpunk)] dark:tracking-wide ${ecosystem.textColor}`}
                            >
                              {ecosystem.name}
                            </h4>
                            {isEvmConnected && (
                              <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_2px_var(--color-neon-cyan)]">
                            {isEvmConnected
                              ? `Connected: ${account.displayName}`
                              : ecosystem.description}
                          </p>
                          {/* Only show wallet badges when not connected */}
                          {!isEvmConnected && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {ecosystem.wallets.map((wallet) => (
                                <span
                                  key={wallet}
                                  className="text-xs bg-white/50 dark:bg-neon-cyan/10 dark:border dark:border-neon-cyan/30 dark:text-neon-cyan dark:shadow-[0_0_4px_var(--color-neon-cyan)] px-2 py-1 rounded-full"
                                >
                                  {wallet}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-gray-400 dark:text-neon-cyan dark:shadow-[0_0_8px_var(--color-neon-cyan)]">
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
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  );
                }}
              </ConnectButton.Custom>
            );
          }

          // Solana ecosystem
          const solanaConnected = !!solanaPublicKey;

          return (
            <Card
              key={ecosystem.type}
              className={`${ecosystem.color} border-2 hover:shadow-md dark:hover:shadow-[0_0_24px_var(--color-neon-pink-66),0_0_32px_var(--color-neon-cyan-44)] transition-all duration-300 cursor-pointer dark:hover:scale-[1.02] dark:hover:border-neon-pink/60`}
              onClick={() => onSelect(ecosystem.type)}
              hover
              data-testid="solana-ecosystem-card"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{ecosystem.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-semibold dark:font-[var(--font-cyberpunk)] dark:tracking-wide ${ecosystem.textColor}`}
                    >
                      {ecosystem.name}
                    </h4>
                    {solanaConnected && (
                      <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_2px_var(--color-neon-pink)]">
                    {solanaConnected
                      ? `Connected: ${solanaPublicKey.toString().slice(0, 4)}...${solanaPublicKey.toString().slice(-4)}`
                      : ecosystem.description}
                  </p>
                  {/* Only show wallet badges when not connected */}
                  {!solanaConnected && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ecosystem.wallets.map((wallet) => (
                        <span
                          key={wallet}
                          className="text-xs bg-white/50 dark:bg-neon-pink/10 dark:border dark:border-neon-pink/30 dark:text-neon-pink dark:shadow-[0_0_4px_var(--color-neon-pink)] px-2 py-1 rounded-full"
                        >
                          {wallet}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-gray-400 dark:text-neon-pink dark:shadow-[0_0_8px_var(--color-neon-pink)]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Separator />

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="text-gray-600 dark:text-gray-300 dark:hover:text-neon-cyan dark:border-neon-cyan/30 dark:hover:border-neon-cyan dark:hover:shadow-[0_0_8px_var(--color-neon-cyan)] dark:hover:scale-105"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EcosystemSelector;

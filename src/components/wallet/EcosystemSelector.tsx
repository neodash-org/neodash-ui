import React from 'react';
import { Card, Button, Separator } from '@/design-system/components';
import { WalletType } from '@/lib/wallet/types';

interface EcosystemSelectorProps {
  onSelect: (type: WalletType) => void;
  onClose: () => void;
}

const EcosystemSelector: React.FC<EcosystemSelectorProps> = ({ onSelect, onClose }) => {
  const ecosystems = [
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
      wallets: ['Phantom', 'Solflare', 'Backpack'],
      color:
        'bg-purple-50 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/20 border-purple-200 dark:border-neon-pink/40 dark:shadow-[0_0_16px_var(--color-neon-pink-44)]',
      textColor:
        'text-purple-700 dark:text-neon-pink dark:drop-shadow-[0_0_4px_var(--color-neon-pink)]',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white dark:font-[var(--font-cyberpunk)] dark:tracking-wide dark:drop-shadow-[0_0_8px_var(--color-neon-cyan)] mb-2">
          Choose Your Ecosystem
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_4px_var(--color-neon-cyan)]">
          Select the blockchain ecosystem you want to connect to
        </p>
      </div>

      <div className="grid gap-3">
        {ecosystems.map((ecosystem) => (
          <Card
            key={ecosystem.type}
            className={`${ecosystem.color} border-2 hover:shadow-md dark:hover:shadow-[0_0_24px_var(--color-neon-cyan-66),0_0_32px_var(--color-neon-pink-44)] transition-all duration-300 cursor-pointer dark:hover:scale-[1.02] dark:hover:border-neon-cyan/60`}
            onClick={() => onSelect(ecosystem.type)}
            hover
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{ecosystem.icon}</div>
              <div className="flex-1">
                <h4
                  className={`font-semibold dark:font-[var(--font-cyberpunk)] dark:tracking-wide ${ecosystem.textColor}`}
                >
                  {ecosystem.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_2px_var(--color-neon-cyan)]">
                  {ecosystem.description}
                </p>
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
              </div>
              <div className="text-gray-400 dark:text-neon-cyan dark:shadow-[0_0_8px_var(--color-neon-cyan)]">
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
        ))}
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

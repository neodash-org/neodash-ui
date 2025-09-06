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
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    {
      type: 'solana' as WalletType,
      name: 'Solana',
      description: 'Connect to Solana blockchain',
      icon: '🟣',
      wallets: ['Phantom', 'Solflare', 'Backpack'],
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-300',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Choose Your Ecosystem
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select the blockchain ecosystem you want to connect to
        </p>
      </div>

      <div className="grid gap-3">
        {ecosystems.map((ecosystem) => (
          <Card
            key={ecosystem.type}
            className={`${ecosystem.color} border-2 hover:shadow-md transition-all duration-200 cursor-pointer`}
            onClick={() => onSelect(ecosystem.type)}
            hover
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{ecosystem.icon}</div>
              <div className="flex-1">
                <h4 className={`font-semibold ${ecosystem.textColor}`}>{ecosystem.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ecosystem.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ecosystem.wallets.map((wallet) => (
                    <span
                      key={wallet}
                      className="text-xs bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full"
                    >
                      {wallet}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-gray-400">
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
          className="text-gray-600 dark:text-gray-400"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EcosystemSelector;

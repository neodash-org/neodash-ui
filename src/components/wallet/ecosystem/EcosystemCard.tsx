import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/design-system/components';
import {
  EcosystemData,
  WALLET_BADGE_STYLES,
  ECOSYSTEM_TYPES,
} from '@/lib/wallet/ecosystem-constants';

interface EcosystemCardProps {
  ecosystem: EcosystemData;
  isConnected: boolean;
  connectedInfo?: string;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}

const ConnectionIndicator: React.FC = () => (
  <div className="w-2 h-2 bg-green-500 dark:bg-neon-green rounded-full shadow-[0_0_4px_var(--color-green-500)] dark:shadow-[0_0_4px_var(--color-neon-green)]"></div>
);

const WalletBadges: React.FC<{ wallets: string[]; ecosystemType: string }> = ({
  wallets,
  ecosystemType,
}) => (
  <div className="flex flex-wrap gap-1 mt-2">
    {wallets.map((wallet) => (
      <span
        key={wallet}
        className={`text-xs px-2 py-1 rounded-full ${WALLET_BADGE_STYLES[ecosystemType as keyof typeof WALLET_BADGE_STYLES]}`}
      >
        {wallet}
      </span>
    ))}
  </div>
);

export const EcosystemCard: React.FC<EcosystemCardProps> = ({
  ecosystem,
  isConnected,
  connectedInfo,
  onClick,
  disabled = false,
  'data-testid': dataTestId,
}) => {
  const cardClassName = `
    ${ecosystem.color} 
    ${ecosystem.borderColor} 
    ${ecosystem.shadowColor} 
    border-2 
    transition-all 
    duration-300 
    ${
      disabled
        ? 'cursor-default opacity-75'
        : `${ecosystem.hoverColor} cursor-pointer hover:scale-[1.02] dark:hover:scale-[1.02]`
    }
  `.trim();

  return (
    <Card
      className={cardClassName}
      onClick={disabled ? undefined : onClick}
      hover={!disabled}
      data-testid={dataTestId}
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
            {isConnected && <ConnectionIndicator />}
          </div>
          <p
            className={`text-sm text-gray-600 dark:text-gray-300 dark:drop-shadow-[0_0_2px_var(--color-neon-cyan)] ${ecosystem.type === ECOSYSTEM_TYPES.SOLANA ? 'dark:drop-shadow-[0_0_2px_var(--color-neon-pink)]' : ''}`}
          >
            {isConnected ? connectedInfo : ecosystem.description}
          </p>
          {!isConnected && (
            <WalletBadges wallets={ecosystem.wallets} ecosystemType={ecosystem.type} />
          )}
        </div>
        <div
          className={`text-gray-400 ${ecosystem.type === ECOSYSTEM_TYPES.EVM ? 'dark:text-neon-cyan dark:shadow-[0_0_8px_var(--color-neon-cyan)]' : 'dark:text-neon-pink dark:shadow-[0_0_8px_var(--color-neon-pink)]'}`}
        >
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};

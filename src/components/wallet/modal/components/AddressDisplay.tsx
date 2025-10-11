import React from 'react';
import { formatAddress } from '@/lib/utils';

interface AddressDisplayProps {
  address: string;
  isMobile?: boolean;
  dataTestId?: string;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  isMobile = false,
  dataTestId = 'copy-address-icon',
}) => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  const displayAddress = formatAddress(address, { truncate: isMobile, left: 8, right: 8 });

  return (
    <div className="flex items-center gap-2">
      <p
        className={`text-sm text-gray-600 dark:text-gray-300 font-mono ${isMobile ? 'truncate' : 'break-all'} flex-1`}
      >
        {displayAddress}
      </p>
      <button
        onClick={handleCopyAddress}
        className="w-6 h-6 rounded bg-green-100 dark:bg-neon-green/10 border border-green-300 dark:border-neon-green/30 hover:bg-green-200 dark:hover:bg-neon-green/20 hover:border-green-400 dark:hover:border-neon-green hover:shadow-[0_0_8px_var(--color-green-500)] dark:hover:shadow-[0_0_8px_var(--color-neon-green)] transition-all duration-300 flex items-center justify-center flex-shrink-0"
        data-testid={dataTestId}
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
  );
};

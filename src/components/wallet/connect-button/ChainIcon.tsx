'use client';

import React from 'react';
import Image from 'next/image';

// Constants
const CHAIN_ICON_SIZE = 16;

interface ChainIconProps {
  chain: {
    name?: string;
    iconUrl?: string;
    iconBackground?: string;
    hasIcon?: boolean;
  };
}

export const ChainIcon: React.FC<ChainIconProps> = ({ chain }) => {
  if (!chain?.hasIcon || !chain?.iconUrl) return null;

  return (
    <div
      className="w-4 h-4 rounded-full overflow-hidden"
      style={{ background: chain.iconBackground || 'transparent' }}
    >
      <Image
        alt={chain.name ?? 'Chain icon'}
        src={chain.iconUrl}
        width={CHAIN_ICON_SIZE}
        height={CHAIN_ICON_SIZE}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};

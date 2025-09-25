'use client';

import React, { useCallback } from 'react';
import { ChainIcon } from './ChainIcon';

interface ChainButtonProps {
  onClick: () => void;
  className: string;
  ariaLabel: string;
  chain: {
    name?: string;
    iconUrl?: string;
    iconBackground?: string;
    hasIcon?: boolean;
  };
  onTrack: () => void;
}

export const ChainButton: React.FC<ChainButtonProps> = ({
  onClick,
  className,
  ariaLabel,
  chain,
  onTrack,
}) => {
  const handleClick = useCallback(() => {
    onTrack();
    onClick();
  }, [onTrack, onClick]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={className}
      aria-label={ariaLabel}
    >
      <ChainIcon chain={chain} />
      {chain?.name || 'Unknown Network'}
    </button>
  );
};

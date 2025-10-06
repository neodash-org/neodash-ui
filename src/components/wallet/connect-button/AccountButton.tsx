'use client';

import React, { useCallback } from 'react';

interface AccountButtonProps {
  onClick: () => void;
  className: string;
  ariaLabel: string;
  account: { displayName?: string; displayBalance?: string };
  onTrack: () => void;
}

export const AccountButton: React.FC<AccountButtonProps> = ({
  onClick,
  className,
  ariaLabel,
  account,
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
      <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_4px_var(--color-neon-green)]"></div>
      {account?.displayName || 'Unknown Account'}
      {account?.displayBalance ? ` (${account.displayBalance})` : ''}
    </button>
  );
};

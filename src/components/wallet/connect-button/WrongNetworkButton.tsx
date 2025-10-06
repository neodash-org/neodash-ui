'use client';

import React, { useCallback } from 'react';

interface WrongNetworkButtonProps {
  onClick: () => void;
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
  onTrack: () => void;
}

export const WrongNetworkButton: React.FC<WrongNetworkButtonProps> = ({
  onClick,
  className,
  ariaLabel,
  children,
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
      {children}
    </button>
  );
};

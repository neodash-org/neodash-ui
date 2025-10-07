import React from 'react';
import { Card } from '@/design-system/components';

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Card className="mb-4 border-red-200 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20 dark:shadow-[0_0_16px_var(--color-red-44)]">
      <div className="flex items-center space-x-2 text-red-700 dark:text-red-400 dark:drop-shadow-[0_0_4px_var(--color-red)]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm font-medium dark:font-[var(--font-cyberpunk)] dark:tracking-wide">
          {error}
        </span>
      </div>
    </Card>
  );
};

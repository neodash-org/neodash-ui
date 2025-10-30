'use client';

import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div
      className={`bg-red-900/20 border border-red-500/40 rounded-lg p-4 text-red-200 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
          <span className="text-red-400">!</span>
        </div>
        <div className="flex-1">
          <div className="text-red-300 font-semibold mb-1">{title}</div>
          {message && <div className="text-sm text-red-200/90">{message}</div>}
          {onRetry && (
            <div className="mt-3">
              <button
                type="button"
                onClick={onRetry}
                className="px-3 py-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-100 text-sm"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorState;

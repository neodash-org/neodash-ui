import React from 'react';

type QuoteSummaryProps = {
  routeId: string;
  fromAmount: string;
  toAmount: string;
  fromUsd?: number | null;
  toUsd?: number | null;
  gasAmount?: string | null;
  gasSymbol?: string | null;
  gasUsd?: number | null;
};

export function QuoteSummary({
  routeId,
  fromAmount,
  toAmount,
  fromUsd,
  toUsd,
  gasAmount,
  gasSymbol,
  gasUsd,
}: QuoteSummaryProps) {
  return (
    <div className="bg-green-900/20 border border-neon-cyan/50 rounded-lg p-6">
      <h3 className="text-2xl text-neon-cyan mb-4">Bridge Quote</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Route ID</span>
          <span className="font-mono">{routeId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">From Amount</span>
          <span className="font-mono">
            {fromAmount}
            {fromUsd != null ? `  ($${fromUsd.toFixed(2)})` : ''}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">To Amount</span>
          <span className="font-mono text-neon-cyan">
            {toAmount}
            {toUsd != null ? `  ($${toUsd.toFixed(2)})` : ''}
          </span>
        </div>
        {gasAmount && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Estimated Gas</span>
            <span className="font-mono">
              {gasAmount} {gasSymbol || ''}
              {gasUsd != null ? `  ($${Number.isFinite(gasUsd) ? gasUsd.toFixed(2) : gasUsd})` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

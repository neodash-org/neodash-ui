import React from 'react';
import { SkeletonRows } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export type ChainItem = {
  chainId: number;
  name: string;
};

type SupportedChainsProps = {
  chains: ChainItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => Promise<void> | void;
};

export function SupportedChains({ chains, loading, error, onRetry }: SupportedChainsProps) {
  return (
    <div className="bg-gray-800/50 border border-neon-cyan/30 rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-neon-cyan mb-4">Supported Chains</h2>
      {loading && <SkeletonRows count={6} />}
      {!loading && error && <ErrorState title="Error loading chains" onRetry={onRetry} />}
      {!loading && !error && chains.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {chains.slice(0, 10).map((chain) => (
            <div key={chain.chainId} className="text-sm text-gray-300">
              • {chain.name} (ID: {chain.chainId})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

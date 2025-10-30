'use client';

import React from 'react';

type Quote = {
  routeId: string;
  fromChainId: number;
  toChainId: number;
  fromToken: { address: string; symbol?: string; name?: string; decimals?: number };
  toToken: { address: string; symbol?: string; name?: string; decimals?: number };
  fromAmount: string;
  toAmount: string;
  gasFees?: string;
  serviceTime?: number;
  maxServiceTime?: number;
};

interface QuoteSummaryProps {
  quote: Quote | null;
  loading?: boolean;
  error?: string | null;
}

export default function QuoteSummary({ quote, loading, error }: QuoteSummaryProps) {
  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading quote…</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">Failed to load quote</div>;
  }

  if (!quote) {
    return <div className="text-sm text-muted-foreground">No quote yet</div>;
  }

  return (
    <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div>
        <span className="text-muted-foreground">From:</span> {quote.fromAmount}{' '}
        {quote.fromToken.symbol || quote.fromToken.name || 'Token'} on #{quote.fromChainId}
      </div>
      <div>
        <span className="text-muted-foreground">To:</span> {quote.toAmount}{' '}
        {quote.toToken.symbol || quote.toToken.name || 'Token'} on #{quote.toChainId}
      </div>
      {quote.serviceTime ? (
        <div>
          <span className="text-muted-foreground">ETA:</span> ~{Math.round(quote.serviceTime / 60)}{' '}
          min
        </div>
      ) : null}
      {quote.gasFees ? (
        <div>
          <span className="text-muted-foreground">Gas fees:</span> {quote.gasFees}
        </div>
      ) : null}
    </div>
  );
}

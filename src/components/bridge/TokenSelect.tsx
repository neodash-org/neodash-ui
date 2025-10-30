'use client';

import React from 'react';

type Token = {
  address: string;
  symbol: string;
  name?: string;
  decimals?: number;
  logoURI?: string;
};

interface TokenSelectProps {
  label: string;
  tokens: Token[];
  value: string;
  onChange: (tokenAddress: string) => void;
  loading?: boolean;
}

export default function TokenSelect({ label, tokens, value, onChange, loading }: TokenSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full bg-background border rounded-md px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        {tokens.map((t) => (
          <option key={t.address} value={t.address}>
            {t.symbol || t.name || t.address.slice(0, 6)}
          </option>
        ))}
      </select>
    </div>
  );
}

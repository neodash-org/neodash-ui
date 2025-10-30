'use client';

import React from 'react';

type Chain = {
  chainId: number;
  name: string;
  symbol?: string;
  icon?: string;
};

interface ChainSelectProps {
  label: string;
  chains: Chain[];
  value: number;
  onChange: (chainId: number) => void;
  loading?: boolean;
}

export default function ChainSelect({ label, chains, value, onChange, loading }: ChainSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full bg-background border rounded-md px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={loading}
      >
        {chains.map((c) => (
          <option key={c.chainId} value={c.chainId}>
            {c.name} (#{c.chainId})
          </option>
        ))}
      </select>
    </div>
  );
}

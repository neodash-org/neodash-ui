'use client';

import React from 'react';
import { Input } from '@/src/design-system/components/Input';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function AmountInput({ value, onChange, disabled }: AmountInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Amount</label>
      <Input
        type="number"
        min="0"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="0.0"
      />
    </div>
  );
}

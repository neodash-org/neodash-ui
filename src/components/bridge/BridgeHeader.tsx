import React from 'react';

type BridgeHeaderProps = {
  title?: string;
};

export function BridgeHeader({ title = 'Bridge' }: BridgeHeaderProps) {
  return <h1 className="text-4xl text-neon-cyan mb-6 tracking-wide">{title}</h1>;
}

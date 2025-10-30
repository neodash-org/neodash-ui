'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
}

export function Skeleton({
  className = '',
  width = '100%',
  height = 16,
  rounded = true,
}: SkeletonProps) {
  return (
    <div
      className={`bg-white/10 animate-pulse ${rounded ? 'rounded-md' : ''} ${className}`}
      style={{ width, height }}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton key={idx} height={14} width={idx === lines - 1 ? '80%' : '100%'} />
      ))}
    </div>
  );
}

interface SkeletonRowProps {
  count?: number;
  className?: string;
  rowHeight?: number;
}

export function SkeletonRows({ count = 5, className = '', rowHeight = 16 }: SkeletonRowProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <Skeleton key={idx} height={rowHeight} />
      ))}
    </div>
  );
}

export default Skeleton;

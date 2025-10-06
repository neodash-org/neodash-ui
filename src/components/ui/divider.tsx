import React from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({ className, orientation = 'horizontal' }) => {
  return (
    <div
      className={cn(
        'border-white/10',
        orientation === 'horizontal' ? 'border-t w-full' : 'border-l h-full',
        className,
      )}
    />
  );
};

export default Divider;

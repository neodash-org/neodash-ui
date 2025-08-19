import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search';
  size?: 'sm' | 'md' | 'lg';
}

const inputVariants = {
  variant: {
    default: 'bg-bg-card/70 border border-border-light text-text-main placeholder:text-text-muted',
    search:
      'bg-bg-card/70 border border-primary text-text-main placeholder:text-text-muted shadow-[0_0_8px_var(--color-primary)]',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <input
        className={`rounded-lg outline-none transition-all duration-300 focus:border-primary focus:shadow-[0_0_8px_var(--color-primary)] font-[var(--font-sans)] ${inputVariants.variant[variant]} ${inputVariants.size[size]} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

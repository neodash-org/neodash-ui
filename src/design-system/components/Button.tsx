import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Button variants using design system colors
const buttonVariants = {
  variant: {
    primary: 'bg-primary text-white border-none shadow-[0_0_12px_var(--color-primary)]',
    secondary: 'bg-secondary text-white border-none shadow-[0_0_12px_var(--color-secondary)]',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={`rounded-full font-bold font-[var(--font-cyberpunk)] tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${buttonVariants.variant[variant]} ${buttonVariants.size[size]} ${className || ''}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

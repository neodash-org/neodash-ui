'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const PageTitle = () => {
  const pathname = usePathname();

  // Get page title from pathname
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/portfolio':
        return 'Portfolio';
      case '/analytics':
        return 'Analytics';
      case '/settings':
        return 'Settings';
      case '/bridge':
        return 'Bridge';
      default:
        return 'Dashboard';
    }
  };

  const title = getPageTitle(pathname);

  return (
    <div className="px-4 py-4 md:py-6">
      <h1 className="text-neon-pink font-bold text-2xl md:text-3xl tracking-widest m-0 drop-shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] font-[var(--font-cyberpunk)]">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;

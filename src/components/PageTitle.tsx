'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { getPageTitle } from '@/utils/pageTitle';

const PageTitle = () => {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="px-4 py-4 md:py-6" data-testid="page-title">
      <h1 className="text-neon-pink text-2xl md:text-3xl tracking-widest m-0 drop-shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] font-[var(--font-cyberpunk)]">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;

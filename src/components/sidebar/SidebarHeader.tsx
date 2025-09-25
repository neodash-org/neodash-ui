'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mb-10 w-full group" data-testid="sidebar-header">
      <button
        onClick={toggleSidebar}
        className="w-8 h-8 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/30 transition-all duration-300 hover:scale-110 mb-4 opacity-0 group-hover:opacity-100"
        aria-label={isCollapsed ? t('actions.expandSidebar') : t('actions.collapseSidebar')}
        data-testid="sidebar-toggle-button"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" data-testid="expand-icon" />
        ) : (
          <ChevronLeft className="w-4 h-4" data-testid="collapse-icon" />
        )}
      </button>
      {!isCollapsed && (
        <Link
          href="/"
          className="text-2xl tracking-widest text-gray-900 dark:text-white select-none font-[var(--font-cyberpunk)] mb-4 capitalize"
          data-testid="sidebar-logo-text"
        >
          {t('app.name')}
        </Link>
      )}
      {isCollapsed && (
        <Link href="/" className="mb-4" data-testid="sidebar-logo-icon">
          <Image src="/neodash-icon.svg" alt={t('app.name')} width={32} height={32} />
        </Link>
      )}
    </div>
  );
};

export default SidebarHeader;

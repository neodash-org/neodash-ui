'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className="flex flex-col items-center mb-10 w-full group" data-testid="sidebar-header">
      {/* Toggle Button - Only visible on hover for desktop */}
      <button
        onClick={toggleSidebar}
        className="w-8 h-8 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/30 transition-all duration-300 hover:scale-110 mb-4 opacity-0 group-hover:opacity-100"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        data-testid="sidebar-toggle-button"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" data-testid="expand-icon" />
        ) : (
          <ChevronLeft className="w-4 h-4" data-testid="collapse-icon" />
        )}
      </button>

      {/* NEODASH Logo - Only shown when expanded */}
      {!isCollapsed && (
        <Link
          href="/"
          className="text-2xl tracking-widest text-white select-none font-[var(--font-cyberpunk)] mb-4"
          data-testid="sidebar-logo-text"
        >
          NEODASH
        </Link>
      )}

      {/* Icon only when collapsed */}
      {isCollapsed && (
        <Link href="/" className="mb-4" data-testid="sidebar-logo-icon">
          <Image src="/neodash-icon.svg" alt="NEODASH" width={32} height={32} />
        </Link>
      )}
    </div>
  );
};

export default SidebarHeader;

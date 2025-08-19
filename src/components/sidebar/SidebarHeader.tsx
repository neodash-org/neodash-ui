'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div className="flex flex-col items-center mb-10 w-full">
      {/* Toggle Button - Always visible and clickable */}
      <button
        onClick={toggleSidebar}
        className="w-8 h-8 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/30 transition-all duration-300 hover:scale-110 mb-4"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        )}
      </button>

      {/* NEODASH Logo - Only shown when expanded */}
      {!isCollapsed && (
        <Link
          href="/"
          className="text-2xl tracking-widest text-white select-none font-[var(--font-cyberpunk)] mb-4"
        >
          NEODASH
        </Link>
      )}

      {/* Icon only when collapsed */}
      {isCollapsed && (
        <Link href="/" className="mb-4">
          <Image src="/neodash-icon.svg" alt="NEODASH" width={32} height={32} />
        </Link>
      )}
    </div>
  );
};

export default SidebarHeader;

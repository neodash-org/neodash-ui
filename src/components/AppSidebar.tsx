'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../hooks/useSidebar';

const AppSidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
    { href: '/bridge', label: 'Bridge', icon: '🌉' },
  ];

  return (
    <aside
      className={`bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] flex flex-col items-center py-8 z-[101] transition-all duration-300 ease-in-out group ${
        isCollapsed ? 'w-16' : 'w-[190px]'
      }`}
    >
      {/* Logo and Toggle Button */}
      <div className="flex flex-col items-center mb-10 w-full">
        {/* Toggle Button - Hidden by default, visible on sidebar hover */}
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/30 transition-all duration-300 hover:scale-110 mb-4 opacity-0 group-hover:opacity-100"
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
            className="text-2xl font-bold tracking-widest text-main select-none font-[var(--font-cyberpunk)] mb-4"
          >
            NEODASH
          </Link>
        )}

        {/* Icon only when collapsed */}
        {isCollapsed && (
          <Link href="/" className="mb-4">
            <img src="/neodash-icon.svg" alt="NEODASH" className="w-8 h-8" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 w-full px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`neodash-nav-link text-center transition-all duration-300 relative ${
                isCollapsed ? 'collapsed' : ''
              } ${isActive ? 'active text-neon-pink' : 'text-main hover:text-neon-cyan'}`}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active indicator for collapsed state */}
              {isCollapsed && isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-neon-pink shadow-[0_0_4px_var(--color-neon-pink)]"></div>
              )}

              <span className={`${isCollapsed ? 'mr-0' : 'mr-2'}`}>{item.icon}</span>
              {!isCollapsed && item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Profile section removed - will be in header after wallet connection */}
    </aside>
  );
};

export default AppSidebar;

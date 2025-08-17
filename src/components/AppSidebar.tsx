'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar, useTheme } from '@/hooks';

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/portfolio', label: 'Portfolio', icon: '💼' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
    { href: '/bridge', label: 'Bridge', icon: '🌉' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, visible on desktop */}
      <aside
        className={`hidden md:flex bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] flex-col items-center py-8 z-[101] transition-all duration-300 ease-in-out group ${
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
              className="text-2xl font-bold tracking-widest text-white select-none font-[var(--font-cyberpunk)] mb-4"
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
        <nav className="flex flex-col gap-4 w-full px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`neodash-nav-link text-center transition-all duration-300 relative ${
                  isCollapsed ? 'collapsed' : ''
                } ${isActive ? 'active text-neon-cyan' : 'text-white hover:text-neon-cyan'}`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active indicator for collapsed state */}
                {isCollapsed && isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-neon-cyan shadow-[0_0_4px_var(--color-neon-cyan)]"></div>
                )}

                <span className={`${isCollapsed ? 'mr-0' : 'mr-2'}`}>{item.icon}</span>
                {!isCollapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Theme Toggle removed from desktop sidebar - only in mobile menu */}
      </aside>

      {/* Mobile Menu Overlay - Only visible on mobile when menu is open */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
            onClick={onMobileMenuClose}
          />

          {/* Mobile Menu */}
          <aside className="md:hidden fixed left-0 top-0 h-full w-80 bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] z-[201] transform transition-transform duration-300 ease-in-out">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <h2 className="text-xl font-bold text-white font-[var(--font-cyberpunk)]">
                  NEODASH
                </h2>
              </div>
              <button
                onClick={onMobileMenuClose}
                className="w-8 h-8 bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300"
                aria-label="Close mobile menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileMenuClose}
                    className={`flex items-center gap-4 py-3 transition-all duration-300 ${
                      isActive ? 'text-neon-cyan' : 'text-white hover:text-neon-cyan'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="px-6">
              <div className="border-t border-white/10" />
            </div>

            {/* Theme Toggle */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Theme</span>
                <button
                  onClick={toggleTheme}
                  className={`relative bg-bg-card/70 border border-white/10 rounded-full w-12 h-7 flex items-center cursor-pointer shadow-[0_0_8px_var(--color-neon-cyan)] transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDark ? 'justify-start' : 'justify-end'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  <span
                    className={`block w-6 h-6 bg-gradient-to-br from-neon-pink to-neon-cyan rounded-full shadow-[0_0_8px_var(--color-neon-pink),0_0_16px_var(--color-neon-cyan)] transition-all duration-300 ${
                      isDark ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="text-center text-xs text-white/60 mt-2">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-pink rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default AppSidebar;

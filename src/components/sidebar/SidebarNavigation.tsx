'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/utils/navigationData';

interface SidebarNavigationProps {
  isCollapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isCollapsed }) => {
  const pathname = usePathname();

  return (
    <nav className={`flex flex-col gap-4 w-full ${isCollapsed ? 'px-2' : 'px-4'}`}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <div
            key={item.href}
            className={`${isCollapsed ? 'flex justify-center' : 'flex items-center'}`}
          >
            <Link
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
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;

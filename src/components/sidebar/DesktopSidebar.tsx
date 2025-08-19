'use client';

import React from 'react';
import { useSidebar } from '@/hooks';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';

const DesktopSidebar: React.FC = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  console.log('DesktopSidebar - isCollapsed:', isCollapsed);
  console.log('DesktopSidebar - width class:', isCollapsed ? 'w-16' : 'w-[190px]');

  return (
    <aside
      className={`hidden md:flex bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] flex-col items-center py-8 z-[101] transition-all duration-300 ease-in-out group overflow-hidden ${
        isCollapsed ? 'w-16' : 'w-[190px]'
      }`}
      data-testid="desktop-sidebar"
      data-collapsed={isCollapsed}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarNavigation isCollapsed={isCollapsed} />
      <div className="flex-1" />
    </aside>
  );
};

export default DesktopSidebar;

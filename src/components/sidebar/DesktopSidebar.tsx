'use client';

import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import Footer from './Footer';

const DesktopSidebar: React.FC = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`hidden md:flex bg-bg-sidebar border-r border-white/10 shadow-[0_0_24px_#00fff044] flex-col items-center pt-8 z-[101] transition-all duration-300 ease-in-out group overflow-hidden ${
        isCollapsed ? 'w-16' : 'w-[190px]'
      }`}
      data-testid="desktop-sidebar"
      data-collapsed={isCollapsed}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarNavigation isCollapsed={isCollapsed} />
      <div className="flex-1" />
      <Footer />
    </aside>
  );
};

export default DesktopSidebar;

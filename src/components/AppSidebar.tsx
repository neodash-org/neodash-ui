'use client';

import React from 'react';
import { DesktopSidebar, MobileMenu } from './sidebar';

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileMenuOpen, onMobileMenuClose }) => {
  return (
    <>
      <DesktopSidebar />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
    </>
  );
};

export default AppSidebar;

'use client';

import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const savedState = localStorage.getItem('neodash-sidebar-collapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  useEffect(() => {
    // Update localStorage when sidebar state changes
    localStorage.setItem('neodash-sidebar-collapsed', isCollapsed.toString());
  }, [isCollapsed]);

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  return { isCollapsed, toggleSidebar };
};

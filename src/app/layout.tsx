'use client';

import React from 'react';
import './globals.css';
import { AppSidebar, Header, PageTitle } from '@/components';
import { useSidebar, useTheme, useMobileMenu } from '@/hooks';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const theme = useTheme(); // Initialize theme system
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Neodash Dashboard</title>
      </head>
      <body
        className={`bg-bg-main text-main min-h-screen font-[var(--font-sans)] ${theme.theme}-mode`}
      >
        <div className="flex min-h-screen max-h-screen overflow-hidden">
          <AppSidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={closeMobileMenu} />
          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col min-h-screen max-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? 'ml-0' : 'ml-0'
            }`}
          >
            <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
            {/* PageTitle - Only visible on mobile */}
            <div className="md:hidden">
              <PageTitle />
            </div>
            <main className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)]">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

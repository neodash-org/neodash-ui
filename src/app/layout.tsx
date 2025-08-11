'use client';

import React from 'react';
import './globals.css';
import { AppSidebar, Header } from '@/components';
import { ThemeDebug } from '@/components/ThemeDebug';
import { useSidebar, useTheme } from '@/hooks';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const theme = useTheme(); // Initialize theme system

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
          <AppSidebar />
          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col min-h-screen max-h-screen transition-all duration-300 ease-in-out ${
              isCollapsed ? 'ml-0' : 'ml-0'
            }`}
          >
            <Header />
            <main className="flex-1 overflow-y-auto max-h-[calc(100vh-80px)]">{children}</main>
          </div>
        </div>
        <ThemeDebug />
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import './globals.css';
import AppSidebar from '../components/AppSidebar';
import Header from '../components/Header';
import { useSidebar } from '../hooks/useSidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

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
      <body className="bg-bg-main text-main min-h-screen font-[var(--font-sans)]">
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
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import { Orbitron, Rajdhani } from 'next/font/google';
import './globals.css';
import { AppSidebar, Header, PageTitle } from '@/components';
import { WalletConnectionModal } from '@/components/wallet';
import { useTheme, useMobileMenu } from '@/hooks';
import { PostHogProvider } from '@/contexts';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { WalletProvider } from '@/context/WalletContext';
import { EVMWalletProvider } from '@/components/providers/EVMWalletProvider';
import { SolanaWalletProvider } from '@/lib/wallet/solana';
import ErrorBoundary from '@/components/ErrorBoundary';
import { initializeErrorHandling } from '@/lib/errorHandling';
import { ToastProvider } from '@/components/shared/Toast';

// Initialize i18n - this needs to happen before components render
import '@/lib/i18n';

// Load fonts using Next.js font optimization
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-cyberpunk',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-rajdhani',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme(); // Initialize theme system
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

  // Initialize global error handling
  React.useEffect(() => {
    initializeErrorHandling();
  }, []);

  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Neodash Dashboard</title>
      </head>
      <body
        className={`bg-bg-main text-main min-h-screen font-[var(--font-sans)] ${theme.theme}-mode`}
      >
        <ErrorBoundary>
          <EVMWalletProvider>
            <SolanaWalletProvider>
              <PostHogProvider>
                <SidebarProvider>
                  <WalletProvider>
                    <ToastProvider>
                      <div className="flex min-h-screen max-h-screen overflow-hidden">
                        <AppSidebar
                          isMobileMenuOpen={isMobileMenuOpen}
                          onMobileMenuClose={closeMobileMenu}
                        />
                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col min-h-screen max-h-screen transition-all duration-300 ease-in-out">
                          <Header
                            onMobileMenuToggle={toggleMobileMenu}
                            isMobileMenuOpen={isMobileMenuOpen}
                          />
                          <main className="flex-1 overflow-y-auto">
                            {/* PageTitle - Only visible on mobile, inside scrollable area */}
                            <div className="md:hidden">
                              <PageTitle />
                            </div>
                            {children}
                          </main>
                        </div>
                      </div>
                      {/* Wallet Connection Modal - Global */}
                      <WalletConnectionModal />
                    </ToastProvider>
                  </WalletProvider>
                </SidebarProvider>
              </PostHogProvider>
            </SolanaWalletProvider>
          </EVMWalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

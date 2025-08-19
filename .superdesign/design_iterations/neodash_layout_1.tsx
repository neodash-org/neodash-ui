// Neodash Cyberpunk Dashboard Layout Shell
// Place this in src/app/layout.tsx (Next.js App Router)

import React from 'react';
import './neodash-theme.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Neodash Dashboard</title>
      </head>
      <body className="neodash-bg">
        <header className="neodash-appbar">
          <div className="neodash-logo">NEODASH</div>
          <nav className="neodash-nav">
            <a href="#" className="neodash-nav-link active">
              Dashboard
            </a>
            <a href="#" className="neodash-nav-link">
              Portfolio
            </a>
            <a href="#" className="neodash-nav-link">
              Analytics
            </a>
            <a href="#" className="neodash-nav-link">
              Settings
            </a>
          </nav>
          <button className="neodash-dark-toggle" aria-label="Toggle dark mode">
            <span className="neodash-toggle-thumb" />
          </button>
        </header>
        <main className="neodash-main">
          <section className="neodash-cards">
            <div className="neodash-card">
              Portfolio Value
              <br />
              <span className="placeholder">$123,456</span>
            </div>
            <div className="neodash-card">
              Gains/Losses
              <br />
              <span className="placeholder">+12.3%</span>
            </div>
            <div className="neodash-card">
              Assets
              <br />
              <span className="placeholder">8</span>
            </div>
          </section>
          <section className="neodash-chart-section">
            <div className="neodash-chart-placeholder">[ Portfolio Performance Chart ]</div>
          </section>
          <section className="neodash-table-section">
            <div className="neodash-table-placeholder">[ Portfolio Assets Table/List ]</div>
          </section>
          {children}
        </main>
      </body>
    </html>
  );
}

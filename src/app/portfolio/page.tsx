import React from 'react';

const PortfolioPage = () => (
  <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col gap-8">
    {/* Portfolio Header */}
    <section className="flex flex-col gap-4">
      <h2 className="text-neon-cyan text-2xl font-bold font-[var(--font-cyberpunk)] tracking-wider">
        Portfolio Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">Total Value</div>
          <div className="text-neon-yellow text-3xl font-bold font-[var(--font-cyberpunk)]">
            $247,892.45
          </div>
          <div className="text-neon-green text-sm mt-2">+5.67% today</div>
        </div>
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">24h Change</div>
          <div className="text-neon-green text-3xl font-bold font-[var(--font-cyberpunk)]">
            +$13,245.67
          </div>
          <div className="text-neon-green text-sm mt-2">+5.67%</div>
        </div>
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">All Time P&L</div>
          <div className="text-neon-pink text-3xl font-bold font-[var(--font-cyberpunk)]">
            +$89,234.12
          </div>
          <div className="text-neon-pink text-sm mt-2">+56.23%</div>
        </div>
      </div>
    </section>

    {/* Asset Allocation Chart */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-8">
      <h3 className="text-neon-cyan text-xl font-bold font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Asset Allocation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-neon-cyan text-lg drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
            [ Pie Chart Placeholder ]
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-neon-pink rounded-full"></div>
              <span className="text-white font-medium">Bitcoin (BTC)</span>
            </div>
            <span className="text-neon-yellow font-bold">45.2%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-neon-cyan rounded-full"></div>
              <span className="text-white font-medium">Ethereum (ETH)</span>
            </div>
            <span className="text-neon-yellow font-bold">28.7%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-neon-green rounded-full"></div>
              <span className="text-white font-medium">Cardano (ADA)</span>
            </div>
            <span className="text-neon-yellow font-bold">12.1%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-neon-yellow rounded-full"></div>
              <span className="text-white font-medium">Others</span>
            </div>
            <span className="text-neon-yellow font-bold">14.0%</span>
          </div>
        </div>
      </div>
    </section>

    {/* Recent Transactions */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-bold font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Recent Transactions
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neon-pink/20 rounded-full flex items-center justify-center text-neon-pink font-bold">
              B
            </div>
            <div>
              <div className="text-white font-medium">Bought BTC</div>
              <div className="text-white/60 text-sm">0.5 BTC @ $43,250</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-neon-green font-bold">-$21,625</div>
            <div className="text-white/60 text-sm">2 hours ago</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-neon-cyan/20 rounded-full flex items-center justify-center text-neon-cyan font-bold">
              S
            </div>
            <div>
              <div className="text-white font-medium">Sold ETH</div>
              <div className="text-white/60 text-sm">2.5 ETH @ $2,680</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-neon-pink font-bold">+$6,700</div>
            <div className="text-white/60 text-sm">1 day ago</div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PortfolioPage;

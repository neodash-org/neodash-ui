import React from 'react';

const AnalyticsPage = () => (
  <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-8">
    {/* Analytics Header */}
    <section className="flex flex-col gap-4">
      <h2 className="text-neon-cyan text-2xl font-bold [font-family:var(--font-cyberpunk)] tracking-wider">
        Analytics Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">Total Volume</div>
          <div className="text-neon-yellow text-2xl font-bold [font-family:var(--font-cyberpunk)]">
            $2.4M
          </div>
          <div className="text-neon-green text-sm mt-2">+18.5% vs last month</div>
        </div>
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">Active Users</div>
          <div className="text-neon-yellow text-2xl font-bold [font-family:var(--font-cyberpunk)]">
            1,247
          </div>
          <div className="text-neon-green text-sm mt-2">+12.3% vs last month</div>
        </div>
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">Success Rate</div>
          <div className="text-neon-yellow text-2xl font-bold [font-family:var(--font-cyberpunk)]">
            98.7%
          </div>
          <div className="text-neon-green text-sm mt-2">+2.1% vs last month</div>
        </div>
        <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
          <div className="text-white/70 text-sm mb-2">Avg. Response</div>
          <div className="text-neon-yellow text-2xl font-bold [font-family:var(--font-cyberpunk)]">
            2.3s
          </div>
          <div className="text-neon-green text-sm mt-2">-15.2% vs last month</div>
        </div>
      </div>
    </section>

    {/* Performance Chart */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-8">
      <h3 className="text-neon-cyan text-xl font-bold [font-family:var(--font-cyberpunk)] mb-6 tracking-wide">
        Portfolio Performance (30 Days)
      </h3>
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neon-cyan text-lg drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
          [ Line Chart Placeholder ]
        </div>
      </div>
    </section>

    {/* Trading Volume Analysis */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
        <h3 className="text-neon-cyan text-xl font-bold [font-family:var(--font-cyberpunk)] mb-6 tracking-wide">
          Trading Volume by Asset
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Bitcoin (BTC)</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-pink rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-neon-yellow font-bold text-sm">75%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Ethereum (ETH)</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-cyan rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-neon-yellow font-bold text-sm">60%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Cardano (ADA)</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-green rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-neon-yellow font-bold text-sm">45%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Solana (SOL)</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-yellow rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-neon-yellow font-bold text-sm">30%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
        <h3 className="text-neon-cyan text-xl font-bold [font-family:var(--font-cyberpunk)] mb-6 tracking-wide">
          Risk Metrics
        </h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Sharpe Ratio</span>
              <span className="text-neon-green font-bold">1.85</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-neon-green rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Max Drawdown</span>
              <span className="text-neon-pink font-bold">-8.2%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-neon-pink rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/70 text-sm">Volatility</span>
              <span className="text-neon-yellow font-bold">24.7%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-neon-yellow rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Market Sentiment */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-bold [font-family:var(--font-cyberpunk)] mb-6 tracking-wide">
        Market Sentiment Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="text-neon-green text-3xl font-bold [font-family:var(--font-cyberpunk)] mb-2">
            Bullish
          </div>
          <div className="text-white/70 text-sm">65% of signals</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="text-white text-3xl font-bold [font-family:var(--font-cyberpunk)] mb-2">
            Neutral
          </div>
          <div className="text-white/70 text-sm">25% of signals</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <div className="text-neon-pink text-3xl font-bold [font-family:var(--font-cyberpunk)] mb-2">
            Bearish
          </div>
          <div className="text-white/70 text-sm">10% of signals</div>
        </div>
      </div>
    </section>
  </div>
);

export default AnalyticsPage;

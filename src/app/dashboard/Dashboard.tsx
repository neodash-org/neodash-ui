'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col gap-10">
      <section className="flex gap-6 flex-wrap justify-between">
        <div className="neodash-card flex-1 min-w-[180px] max-w-xs bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg text-white p-6 text-lg flex flex-col items-start mb-4 transition hover:shadow-[0_0_24px_var(--color-neon-pink),0_0_32px_var(--color-neon-cyan)] hover:scale-105">
          {t('dashboard.totalValue')}
          <br />
          <span className="text-neon-yellow text-2xl mt-2 drop-shadow-[0_0_8px_var(--color-neon-yellow)]">
            $123,456
          </span>
        </div>
        <div className="neodash-card flex-1 min-w-[180px] max-w-xs bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg text-white p-6 text-lg flex flex-col items-start mb-4 transition hover:shadow-[0_0_24px_var(--color-neon-pink),0_0_32px_var(--color-neon-cyan)] hover:scale-105">
          {t('dashboard.change24h')}
          <br />
          <span className="text-neon-yellow text-2xl mt-2 drop-shadow-[0_0_8px_var(--color-neon-yellow)]">
            +12.3%
          </span>
        </div>
        <div className="neodash-card flex-1 min-w-[180px] max-w-xs bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg text-white p-6 text-lg flex flex-col items-start mb-4 transition hover:shadow-[0_0_24px_var(--color-neon-pink),0_0_32px_var(--color-neon-cyan)] hover:scale-105">
          {t('portfolio.holdings')}
          <br />
          <span className="text-neon-yellow text-2xl mt-2 drop-shadow-[0_0_8px_var(--color-neon-yellow)]">
            8
          </span>
        </div>
      </section>
      <section className="bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-8 min-h-[220px] flex items-center justify-center">
        <div className="text-neon-cyan text-lg drop-shadow-[0_0_8px_var(--color-neon-cyan)]">
          [ {t('portfolio.performance')} ]
        </div>
      </section>
      <section className="bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6 min-h-[160px]">
        <div className="text-neon-green text-base drop-shadow-[0_0_8px_var(--color-neon-green)]">
          [ {t('portfolio.allocation')} ]
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

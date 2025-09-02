'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks';
import { LanguageSwitcher } from '@/components';

export default function TestI18nPage() {
  const { t } = useTranslation();
  const { currentLanguage, isEnglish, isFrench } = useLanguage();

  return (
    <div className="min-h-screen bg-bg-main text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neon-pink mb-8">
          {t('dashboard.title')} - i18n Test
        </h1>

        {/* Language Info */}
        <div className="bg-bg-card p-6 rounded-lg mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Language Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Current Language:</strong> {currentLanguage}
            </p>
            <p>
              <strong>Is English:</strong> {isEnglish ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Is French:</strong> {isFrench ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="bg-bg-card p-6 rounded-lg mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Language Switcher</h2>
          <div className="flex gap-4">
            <LanguageSwitcher variant="button" size="lg" />
            <LanguageSwitcher variant="dropdown" size="lg" />
          </div>
        </div>

        {/* Translation Examples */}
        <div className="bg-bg-card p-6 rounded-lg mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Translation Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neon-yellow mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Dashboard:</strong> {t('navigation.dashboard')}
                </li>
                <li>
                  <strong>Portfolio:</strong> {t('navigation.portfolio')}
                </li>
                <li>
                  <strong>Bridge:</strong> {t('navigation.bridge')}
                </li>
                <li>
                  <strong>Settings:</strong> {t('navigation.settings')}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neon-yellow mb-3">Common Actions</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Loading:</strong> {t('common.loading')}
                </li>
                <li>
                  <strong>Save:</strong> {t('common.save')}
                </li>
                <li>
                  <strong>Cancel:</strong> {t('common.cancel')}
                </li>
                <li>
                  <strong>Search:</strong> {t('common.search')}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neon-yellow mb-3">Wallet</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Connect:</strong> {t('wallet.connect')}
                </li>
                <li>
                  <strong>Disconnect:</strong> {t('wallet.disconnect')}
                </li>
                <li>
                  <strong>Connected:</strong> {t('wallet.connected')}
                </li>
                <li>
                  <strong>Balance:</strong> {t('wallet.balance')}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neon-yellow mb-3">Settings</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Language:</strong> {t('settings.language')}
                </li>
                <li>
                  <strong>Dark Mode:</strong> {t('settings.darkMode')}
                </li>
                <li>
                  <strong>Notifications:</strong> {t('settings.notifications')}
                </li>
                <li>
                  <strong>Security:</strong> {t('settings.security')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bridge Example */}
        <div className="bg-bg-card p-6 rounded-lg mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-neon-cyan mb-4">Bridge Interface</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('bridge.from')}</label>
              <select className="w-full bg-bg-main border border-white/20 rounded-lg px-3 py-2">
                <option>Ethereum</option>
                <option>Polygon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('bridge.to')}</label>
              <select className="w-full bg-bg-main border border-white/20 rounded-lg px-3 py-2">
                <option>Polygon</option>
                <option>Ethereum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('bridge.amount')}</label>
              <input
                type="number"
                placeholder={t('bridge.enterAmount')}
                className="w-full bg-bg-main border border-white/20 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t('bridge.token')}</label>
              <select className="w-full bg-bg-main border border-white/20 rounded-lg px-3 py-2">
                <option>USDC</option>
                <option>ETH</option>
              </select>
            </div>
          </div>
          <button className="mt-6 bg-neon-cyan text-black px-6 py-3 rounded-lg font-bold hover:bg-neon-cyan/80 transition-colors">
            {t('bridge.initiate')}
          </button>
        </div>
      </div>
    </div>
  );
}

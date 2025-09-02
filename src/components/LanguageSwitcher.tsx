'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'button',
  size = 'md',
}) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative group">
        <button
          className={`${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 hover:scale-105`}
          aria-label={t('settings.languageSelection')}
        >
          <Globe className={iconSizes[size]} />
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 bg-bg-card border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[120px]">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors ${
                currentLanguage === lang ? 'text-neon-cyan bg-neon-cyan/10' : 'text-white'
              }`}
            >
              {t(`settings.${lang === 'en' ? 'english' : 'french'}`)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Button variant (toggle between languages)
  return (
    <button
      onClick={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}
      className={`${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 hover:scale-105`}
      aria-label={t('settings.languageSelection')}
      title={`${t('settings.languageSelection')}: ${t(`settings.${currentLanguage === 'en' ? 'english' : 'french'}`)}`}
    >
      <span className="font-bold">{currentLanguage.toUpperCase()}</span>
    </button>
  );
};

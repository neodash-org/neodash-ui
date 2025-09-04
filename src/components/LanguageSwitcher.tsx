'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'button',
  size = 'md',
}) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { t, ready } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const flagEmojis = {
    en: '🇬🇧',
    fr: '🇫🇷',
    es: '🇪🇸',
    pt: '🇵🇹',
    'pt-BR': '🇧🇷',
    ja: '🇯🇵',
    zh: '🇨🇳',
    de: '🇩🇪',
    it: '🇮🇹',
    ru: '🇷🇺',
  };

  const languageNames = {
    en: 'EN',
    fr: 'FR',
    es: 'ES',
    pt: 'PT',
    'pt-BR': 'BR',
    ja: 'JP',
    zh: 'CN',
    de: 'DE',
    it: 'IT',
    ru: 'RU',
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't render until i18n is ready
  if (!ready) {
    return (
      <div
        className={`${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center text-neon-cyan/50`}
      >
        <span className="text-xs">...</span>
      </div>
    );
  }

  const handleLanguageChange = (
    language: 'en' | 'fr' | 'es' | 'pt' | 'pt-BR' | 'ja' | 'zh' | 'de' | 'it' | 'ru',
  ) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className={`${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 hover:scale-105`}
          aria-label={t('settings.languageSelection')}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span>{flagEmojis[currentLanguage as keyof typeof flagEmojis]}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 top-full mt-2 bg-bg-card border border-white/10 rounded-lg shadow-lg z-50 min-w-[120px]"
            role="listbox"
            aria-label={t('settings.languageSelection')}
          >
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 ${
                  currentLanguage === lang ? 'text-neon-cyan bg-neon-cyan/10' : 'text-white'
                }`}
                role="option"
                aria-selected={currentLanguage === lang}
              >
                <span className="text-lg">{flagEmojis[lang as keyof typeof flagEmojis]}</span>
                <span className="font-medium">
                  {languageNames[lang as keyof typeof languageNames]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Button variant (toggle between languages)
  const allLanguages = ['en', 'fr', 'es', 'pt', 'pt-BR', 'ja', 'zh', 'de', 'it', 'ru'] as const;
  const currentIndex = allLanguages.indexOf(currentLanguage as (typeof allLanguages)[number]);
  const nextLanguage = allLanguages[(currentIndex + 1) % allLanguages.length];

  return (
    <button
      onClick={() => changeLanguage(nextLanguage)}
      className={`${sizeClasses[size]} bg-bg-card/70 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300 hover:scale-105`}
      aria-label={t('settings.languageSelection')}
      title={`${t('settings.languageSelection')}: ${t(`settings.${currentLanguage === 'en' ? 'english' : currentLanguage === 'fr' ? 'french' : currentLanguage === 'es' ? 'spanish' : currentLanguage === 'pt' ? 'portuguese' : currentLanguage === 'pt-BR' ? 'portugueseBrazil' : currentLanguage === 'ja' ? 'japanese' : currentLanguage === 'zh' ? 'chinese' : currentLanguage === 'de' ? 'german' : currentLanguage === 'it' ? 'italian' : 'russian'}`)}`}
    >
      <span className="mr-1">{flagEmojis[currentLanguage as keyof typeof flagEmojis]}</span>
      <span className="font-bold">
        {languageNames[currentLanguage as keyof typeof languageNames]}
      </span>
    </button>
  );
};

import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';
  const isFrench = currentLanguage === 'fr';

  const changeLanguage = useCallback(
    (language: 'en' | 'fr') => {
      i18n.changeLanguage(language);
    },
    [i18n],
  );

  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    changeLanguage(newLanguage);
  }, [currentLanguage, changeLanguage]);

  return {
    currentLanguage,
    isEnglish,
    isFrench,
    changeLanguage,
    toggleLanguage,
    availableLanguages: ['en', 'fr'] as const,
  };
};

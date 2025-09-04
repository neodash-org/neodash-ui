import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';

export const useLanguage = () => {
  const { i18n, ready } = useTranslation();

  const availableLanguages = useMemo(
    () => ['en', 'fr', 'es', 'pt', 'pt-BR', 'ja', 'zh', 'de', 'it', 'ru'] as const,
    [],
  );

  const changeLanguage = useCallback(
    (language: 'en' | 'fr' | 'es' | 'pt' | 'pt-BR' | 'ja' | 'zh' | 'de' | 'it' | 'ru') => {
      if (ready && i18n.isInitialized) {
        i18n.changeLanguage(language);
      }
    },
    [i18n, ready],
  );

  const toggleLanguage = useCallback(() => {
    if (!ready || !i18n.isInitialized) return;

    const currentLanguage = i18n.language || 'en';
    const currentIndex = availableLanguages.indexOf(
      currentLanguage as (typeof availableLanguages)[number],
    );
    const nextLanguage = availableLanguages[(currentIndex + 1) % availableLanguages.length];
    changeLanguage(nextLanguage);
  }, [ready, i18n, availableLanguages, changeLanguage]);

  // Ensure i18n is ready before proceeding
  if (!ready || !i18n.isInitialized) {
    return {
      currentLanguage: 'en',
      isEnglish: true,
      isFrench: false,
      changeLanguage,
      toggleLanguage,
      availableLanguages,
    };
  }

  const currentLanguage = i18n.language || 'en';
  const isEnglish = currentLanguage === 'en';
  const isFrench = currentLanguage === 'fr';

  return {
    currentLanguage,
    isEnglish,
    isFrench,
    changeLanguage,
    toggleLanguage,
    availableLanguages,
  };
};

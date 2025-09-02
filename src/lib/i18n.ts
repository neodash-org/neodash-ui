import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

// Configure i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Available languages
    supportedLngs: ['en', 'fr'],

    // Default language
    fallbackLng: 'en',

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Translation resources
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
    },

    // React integration
    react: {
      useSuspense: false, // Disable Suspense for better error handling
    },
  });

export default i18n;

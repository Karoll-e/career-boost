import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

const resources = {
  en: {
    translation: enTranslations
  },
  es: {
    translation: esTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    
    // Language detection options
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      
      // Keys or params to lookup language from
      lookupLocalStorage: 'career-boost-language',
      
      // Cache user language
      caches: ['localStorage'],
    },

    fallbackLng: 'en', // Default language if detection fails
    
    debug: false, // Set to true for development debugging
    
    interpolation: {
      escapeValue: false // React already does escaping
    },

    // React i18next special options
    react: {
      useSuspense: false // Set to false to avoid suspense in case of slow loading
    }
  });

export default i18n;
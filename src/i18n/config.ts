
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Function to detect and set RTL direction
const setDirection = (language: string) => {
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
};

// Initialize with current language
const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
setDirection(currentLanguage);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    fallbackLng: 'en',
    debug: false,
    lng: currentLanguage,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    react: {
      useSuspense: false
    }
  });

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setDirection(lng);
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;

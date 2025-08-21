import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  es: {
    code: 'es', 
    name: 'Español',
    flag: '🇪🇸'
  }
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isChanging, setIsChanging] = useState(false);

  // Update current language when i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setCurrentLanguage(lng);
      setIsChanging(false);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const changeLanguage = useCallback(async (languageCode) => {
    if (languageCode === currentLanguage) return;
    
    setIsChanging(true);
    
    try {
      await i18n.changeLanguage(languageCode);
      
      // Store in localStorage for persistence
      localStorage.setItem('career-boost-language', languageCode);
      
      // Update document language
      document.documentElement.lang = languageCode;
      
    } catch (error) {
      console.error('Error changing language:', error);
      setIsChanging(false);
    }
  }, [currentLanguage, i18n]);

  const getCurrentLanguageInfo = useCallback(() => {
    return SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES.en;
  }, [currentLanguage]);

  const getSupportedLanguages = useCallback(() => {
    return Object.values(SUPPORTED_LANGUAGES);
  }, []);

  const contextValue = {
    currentLanguage,
    isChanging,
    changeLanguage,
    getCurrentLanguageInfo,
    getSupportedLanguages,
    supportedLanguages: SUPPORTED_LANGUAGES
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
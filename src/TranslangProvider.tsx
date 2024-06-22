import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Translations } from './types';

export interface TranslangContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const TranslangContext = createContext<TranslangContextType | undefined>(undefined);

interface TranslangProviderProps {
  translations: Translations;
  defaultLanguage: Language;
  children: React.ReactNode;
}

export const TranslangProvider: React.FC<TranslangProviderProps> = ({
  translations,
  defaultLanguage,
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translationsState, setTranslationsState] = useState(translations[defaultLanguage]);

  const detectLanguage = useCallback(() => {
    const userLanguage = navigator.language.split('-')[0];
    const supportedLanguages = Object.keys(translations);

    return supportedLanguages.includes(userLanguage) ? userLanguage as Language : defaultLanguage;
  }, [translations, defaultLanguage]);

  useEffect(() => {
    setLanguageState(detectLanguage());
  }, [detectLanguage]);

  useEffect(() => {
    if (translations[language]) {
      setTranslationsState(translations[language]);
    } else {
      console.warn(
        `Translation for language '${language}' not found. Defaulting to '${defaultLanguage}'`,
      );
      setLanguageState(defaultLanguage);
      setTranslationsState(translations[defaultLanguage]);
    }
  }, [language, translations, defaultLanguage]);

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
  }, []);

  const t = useCallback((key: string): string => {
    return translationsState[key] || key;
  }, [translationsState]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <TranslangContext.Provider value={contextValue}>
      {children}
    </TranslangContext.Provider>
  );
};

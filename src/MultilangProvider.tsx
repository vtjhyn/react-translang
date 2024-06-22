import React, { createContext, useState, useEffect } from 'react';
import { Language, Translations } from './types';

export interface MultilangContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const MultilangContext = createContext<MultilangContextType | undefined>(undefined);

interface MultilangProviderProps {
  translations: Translations;
  defaultLanguage: Language;
  children: React.ReactNode;
}

export const MultilangProvider: React.FC<MultilangProviderProps> = ({
  translations,
  defaultLanguage,
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translationsState, setTranslationsState] = useState(translations[defaultLanguage]);

  useEffect(() => {
    const detectLanguage = () => {
      const userLanguage = navigator.language.split('-')[0];
      const supportedLanguages = Object.keys(translations);

      if (supportedLanguages.includes(userLanguage)) {
        setLanguageState(userLanguage as Language);
      } else {
        setLanguageState(defaultLanguage);
      }
    };

    detectLanguage();
  }, [translations, defaultLanguage]);

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

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translationsState[key] || key;
  };

  return (
    <MultilangContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </MultilangContext.Provider>
  );
};

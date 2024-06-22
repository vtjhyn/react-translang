import { useContext } from 'react';
import { TranslangContext, TranslangContextType } from './TranslangProvider';

export const useTranslang = (): TranslangContextType => {
  const context = useContext(TranslangContext);
  if (!context) {
    throw new Error('useTranslang must be used within a TranslangProvider');
  }
  return context;
};

import { useContext } from 'react';
import { MultilangContext, MultilangContextType } from './MultilangProvider';

export const useMultilang = (): MultilangContextType => {
  const context = useContext(MultilangContext);
  if (!context) {
    throw new Error('useMultilang must be used within a MultilangProvider');
  }
  return context;
};

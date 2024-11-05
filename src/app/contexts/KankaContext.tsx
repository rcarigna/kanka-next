import React, { createContext, useContext, ReactNode } from 'react';
import { KankaContextType } from './types';
import { useKankaConnection } from './useKankaConnection';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const { status, error, fetchData, campaigns } = useKankaConnection();

  return (
    <KankaContext.Provider
      value={{ status, error, campaigns: campaigns, fetchData }}
    >
      {children}
    </KankaContext.Provider>
  );
};

export const useKankaContext = () => {
  const context = useContext(KankaContext);
  if (!context) {
    throw new Error('useKankaContext must be used within a DataProvider');
  }
  return context;
};

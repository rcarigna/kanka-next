import React, { createContext, useContext, ReactNode, useState } from 'react';
import { KankaContextType } from '../types';
import {
  useCampaigns,
  useEntities,
  useFetchEntity,
  useKankaConnection,
} from '../hooks';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const kankaConnection = useKankaConnection();
  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>(
    undefined
  );
  const { campaigns } = useCampaigns();
  const { entities } = useEntities(selectedCampaign);

  const { fetchEntity } = useFetchEntity(selectedCampaign);

  return (
    <KankaContext.Provider
      value={{
        connection: kankaConnection,
        campaigns,
        fetchEntity,
        selectedCampaign,
        setSelectedCampaign,
        entityTypes: entities,
      }}
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

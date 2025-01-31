import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from 'react';
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

  const [connectionReady, setConnectionReady] = useState<boolean>(false);
  const {
    campaigns,
    error: campaignsError,
    resetError: resetCampaignsError,
  } = useCampaigns(connectionReady);

  const { entities } = useEntities(selectedCampaign);
  const { fetchEntity } = useFetchEntity(selectedCampaign);

  useEffect(() => {
    if (kankaConnection.connection.status === 'valid') {
      setConnectionReady(true);
    }
  }, [kankaConnection.connection.status]);

  useEffect(() => {
    if (campaignsError) {
      console.error(campaignsError);
      resetCampaignsError();
    }
  }, [campaignsError, resetCampaignsError]);

  return (
    <KankaContext.Provider
      value={{
        connection: kankaConnection,
        campaigns: useMemo(() => campaigns ?? [], [campaigns]),
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

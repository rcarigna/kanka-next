import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { CampaignType, KankaContextType } from './types';
import { useKankaConnection } from './useKankaConnection';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const kankaConnection = useKankaConnection();
  const { status } = kankaConnection.connection;

  const { fetchData, loading } = kankaConnection;

  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  useEffect(() => {
    const loadCampaignOptions = async () => {
      if (status === 'valid' && loading) {
        fetchData({ endpoint: `/campaigns`, save: setCampaigns });
      }
    };
    loadCampaignOptions();
  }, [status, fetchData, loading]);

  return (
    <KankaContext.Provider
      value={{
        connection: kankaConnection,
        campaigns: campaigns,
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

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { CampaignType, KankaContextType } from '../types';
import { useKankaConnection } from '../hooks';
import { fetchEntity } from '../api';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const kankaConnection = useKankaConnection();
  const { status, apiKey, baseUrl } = kankaConnection.connection;

  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  useEffect(() => {
    const loadCampaignOptions = async () => {
      if (status === 'valid' && apiKey && baseUrl) {
        try {
          const data = await fetchEntity(apiKey, baseUrl, 'campaigns');
          setCampaigns(data);
        } catch (err) {
          console.error('Error fetching campaigns:', err);
        }
      }
    };

    loadCampaignOptions();
  }, [status, apiKey, baseUrl]);

  // Wrapper for fetching entities
  const fetchEntityWrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (entityType: string, save: (data: any[]) => void) => {
      if (status === 'valid' && apiKey && baseUrl) {
        try {
          const data = await fetchEntity(apiKey, baseUrl, entityType);
          save(data);
        } catch (err) {
          console.error(`Error fetching ${entityType}:`, err);
        }
      }
    },
    [status, apiKey, baseUrl]
  );

  return (
    <KankaContext.Provider
      value={{
        connection: kankaConnection,
        campaigns: campaigns,
        fetchEntity: fetchEntityWrapper,
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

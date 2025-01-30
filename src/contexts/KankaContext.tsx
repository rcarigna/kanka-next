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
import { fetchEntitiesForType, fetchEntityMap } from '../api';
import { EntityType } from '@/api/entityMap';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const loadEntities = async () => {
  const baseEntities = fetchEntityMap();
  return baseEntities.map((entity) => ({
    ...entity,
    path: `./${entity.code}`,
  }));
};

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const kankaConnection = useKankaConnection();
  const { status, apiKey, baseUrl } = kankaConnection.connection;

  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>(
    undefined
  );

  const [entities, setEntities] = useState<EntityType[]>([]);

  useEffect(() => {
    console.log('Selected campaign:', selectedCampaign);
    const fetchEntities = async () => {
      console.log('Entities.length:', entities?.length);
      if (selectedCampaign && entities.length === 0) {
        try {
          const loadedEntities = await loadEntities();
          console.log('Loaded entities:', JSON.stringify(loadedEntities));
          setEntities(loadedEntities);
        } catch (err) {
          console.error('Error loading entities:', err);
        }
      }
    };
    fetchEntities();
  }, [selectedCampaign, entities]);

  // Wrapper for fetching instances of an entity tynpe
  const fetchEntityWrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (entityType: string, save: (data: any[]) => void) => {
      if (status === 'valid') {
        try {
          const data = await fetchEntitiesForType({
            entityType,
            selectedCampaign,
          });
          save(data);
        } catch (err) {
          console.error(`Error fetching ${entityType}:`, err);
        }
      }
    },
    [selectedCampaign, status]
  );

  useEffect(() => {
    const loadCampaignOptions = async () => {
      if (status === 'valid' && apiKey && baseUrl) {
        try {
          // const data = await fetchEntity(apiKey, 'campaigns');
          // setCampaigns(data);
          fetchEntityWrapper('campaigns', setCampaigns);
        } catch (err) {
          console.error('Error fetching campaigns:', err);
        }
      }
    };

    loadCampaignOptions();
  }, [status, apiKey, baseUrl, fetchEntityWrapper]);

  return (
    <KankaContext.Provider
      value={{
        connection: kankaConnection,
        campaigns,
        fetchEntity: fetchEntityWrapper,
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

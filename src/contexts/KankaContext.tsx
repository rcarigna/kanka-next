import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import useSWR from 'swr';
import { KankaContextType } from '../types';
import { useKankaConnection } from '../hooks';
import { getCampaigns, getEntityTypes } from '../api/kankaApi';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useKankaConnection();
  const { status } = connection;

  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>(
    () => {
      const savedCampaign = localStorage.getItem('selectedCampaign');
      return savedCampaign ? Number(savedCampaign) : undefined;
    }
  );

  // Save campaign selection
  useEffect(() => {
    if (selectedCampaign !== undefined) {
      localStorage.setItem('selectedCampaign', selectedCampaign.toString());
    }
  }, [selectedCampaign]);

  const { data: campaigns, error: campaignsError } = useSWR(
    status === 'valid' ? 'campaigns' : null,
    getCampaigns
  );

  const { data: entityTypes, error: entityTypeError } = useSWR(
    selectedCampaign ? ['entityTypes', selectedCampaign] : null,
    getEntityTypes
  );

  useEffect(() => {
    if (campaignsError) {
      console.error(campaignsError);
    }
    if (entityTypeError) {
      console.error(entityTypeError);
    }
  }, [campaignsError, entityTypeError]);

  const updateSelectedCampaign = useCallback(
    (value: number | undefined) => {
      setSelectedCampaign(value);
      if (value === undefined) {
        localStorage.removeItem('selectedCampaign');
      }
    },
    [setSelectedCampaign]
  );
  return (
    <KankaContext.Provider
      value={{
        campaigns: useMemo(() => campaigns ?? [], [campaigns]),
        selectedCampaign,
        setSelectedCampaign: updateSelectedCampaign,
        entityTypes: useMemo(() => entityTypes ?? [], [entityTypes]),
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

'use client';
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
import { useRouterContext } from './RouterContext';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useKankaConnection();
  const { status } = connection;
  const { campaignId, navigateTo, entityType, entityId } = useRouterContext();
  const [selectedCampaign, setSelectedCampaign] = useState<number | undefined>(
    campaignId ? Number(campaignId) : undefined
  );

  const { data: campaigns, error: campaignsError } = useSWR(
    status === 'valid' ? 'campaigns' : null,
    getCampaigns
  );

  const { data: entityTypes, error: entityTypeError } = useSWR(
    selectedCampaign ? ['entityTypes', selectedCampaign] : null,
    getEntityTypes
  );

  useEffect(() => {
    if (entityTypes && selectedCampaign) {
      entityTypes.forEach((entityType) => {
        if (['campaigns', 'entities'].includes(entityType.code)) {
          entityType.sitePath = `/${entityType.code}`;
        } else {
          entityType.sitePath = `/campaigns/${selectedCampaign}/${entityType.code}`;
        }
      });
    }
  }, [entityTypes, selectedCampaign]);

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
      navigateTo(value ? `/campaigns/${value}` : '/');
    },
    [navigateTo]
  );
  return (
    <KankaContext.Provider
      value={{
        campaigns: useMemo(() => campaigns ?? [], [campaigns]),
        selectedCampaign,
        setSelectedCampaign: updateSelectedCampaign,
        entityTypes: useMemo(() => entityTypes ?? [], [entityTypes]),
        selectedEntityType: entityType,
        selectedEntityId: entityId,
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

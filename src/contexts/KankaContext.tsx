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
import {
  getCampaigns,
  getEntityTypes,
  fetchEntitiesForType,
  getEntityByID,
} from '../api/kanka/kankaApi';
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

  const fetchEntitiesKey = useMemo(
    () =>
      selectedCampaign && entityType ? { entityType, selectedCampaign } : null,
    [selectedCampaign, entityType]
  );

  const {
    data: entities,
    error: entitiesError,
    isLoading: entitiesLoading,
  } = useSWR(fetchEntitiesKey, fetchEntitiesForType);

  const fetchEntityKey = useMemo(
    () =>
      selectedCampaign && entityType && entityId
        ? { entityType, selectedCampaign, entityId }
        : null,
    [selectedCampaign, entityType, entityId]
  );
  const {
    data: entityData,
    error: entityError,
    isLoading: entityLoading,
  } = useSWR(fetchEntityKey, getEntityByID);
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
    if (entitiesError) {
      console.error(entitiesError);
    }
  }, [campaignsError, entityTypeError, entitiesError]);

  const updateSelectedCampaign = useCallback(
    (value: number | undefined) => {
      setSelectedCampaign(value);
      navigateTo(value ? `/campaigns/${value}` : '/');
    },
    [navigateTo]
  );

  const value = useMemo(
    () => ({
      campaigns: campaigns || [],
      campaignsError,
      selectedCampaign,
      setSelectedCampaign: updateSelectedCampaign,
      entityTypes: entityTypes || [],
      entityTypeError,
      selectedEntityType: entityType,
      selectedEntityId: entityId,
      entities: entities || [],
      entitiesError,
      entitiesLoading,
      entityData,
      entityError,
      entityLoading,
    }),
    [
      campaigns,
      campaignsError,
      selectedCampaign,
      updateSelectedCampaign,
      entityTypes,
      entityTypeError,
      entityType,
      entityId,
      entities,
      entitiesError,
      entitiesLoading,
      entityData,
      entityError,
      entityLoading,
    ]
  );

  return (
    <KankaContext.Provider value={value}>{children}</KankaContext.Provider>
  );
};

export const useKankaContext = () => {
  const context = useContext(KankaContext);
  if (!context) {
    throw new Error('useKankaContext must be used within a DataProvider');
  }
  return context;
};

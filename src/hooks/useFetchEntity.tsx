import { useState, useCallback } from 'react';
import { fetchEntitiesForType } from '../api/kankaApi';

export const useFetchEntity = (selectedCampaign: number | undefined) => {
  const [entities, setEntities] = useState<unknown>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchEntityWrapper = useCallback(
    async (entityType: string) => {
      if (selectedCampaign) {
        try {
          const data = await fetchEntitiesForType({
            entityType,
            selectedCampaign,
          });
          setEntities(data);
        } catch (err) {
          setError(err as Error);
        }
      }
    },
    [selectedCampaign]
  );

  return { entities, error, fetchEntity: fetchEntityWrapper };
};

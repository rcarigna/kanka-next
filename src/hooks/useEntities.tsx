import { useState, useEffect } from 'react';
import { getEntityTypes } from '../api/kankaApi';
import { EntityType } from '../types';
export const useEntities = (selectedCampaign: number | undefined) => {
  const [entities, setEntities] = useState<EntityType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await getEntityTypes();
        setEntities(data);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchEntities();
  }, [selectedCampaign]);

  return { entities, error };
};

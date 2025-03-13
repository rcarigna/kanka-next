import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, CircularProgress } from '@mui/material';
import { getEntityByID } from '../../../api';
import { useKankaContext } from '@/contexts';

export const EntityInstance = ({
  entityType,
  id,
}: {
  entityType: string;
  id: number;
}) => {
  const { selectedCampaign, entityTypes: entityMap } = useKankaContext();

  // const entityMap = fetchEntityMap();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [entity, setEntity] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (!entityType || !id || !selectedCampaign) {
      setLoading(false);
      return;
    }

    if (!entityMap.some((entity) => entity.code === entityType)) {
      setLoading(false);
      return;
    }

    if (entity === undefined) {
      setLoading(true);
      getEntityByID(entityType, id, selectedCampaign)
        .then((data) => {
          setEntity(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [entityType, id, selectedCampaign, entity, entityMap]);

  if (!loading && !selectedCampaign) {
    return (
      <Typography
        variant='h6'
        color='error'
        data-testid='entity-campaign-error-message'
      >
        No campaign selected
      </Typography>
    );
  }
  if (!id) {
    return (
      <Typography
        variant='h6'
        color='error'
        data-testid='entity-id-error-message'
      >
        Invalid entity ID
      </Typography>
    );
  }
  if (!entityType || !entityMap.some((entity) => entity.code === entityType)) {
    return (
      <Typography
        variant='h6'
        color='error'
        data-testid='entity-type-error-message'
      >
        Invalid entity type{entityType ? `: ${entityType}` : ''}
      </Typography>
    );
  }
  if (loading) {
    return (
      <Box>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Typography variant='h6' color='error' data-testid='entity-error-message'>
        {error.message}
      </Typography>
    );
  }
  return (
    <Card
      data-testid='entities-panel'
      style={{ paddingLeft: '30px', paddingRight: '30px' }}
    >
      {entity === undefined ? (
        <Box>
          No entities with id {id} of type {entityType} available
        </Box>
      ) : (
        <Box>{entity.name}</Box>
      )}
    </Card>
  );
};

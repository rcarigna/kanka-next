import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, CircularProgress } from '@mui/material';
import { fetchEntityMap, fetchEntityById } from '../../../api';
import { Entity } from '../EntityPanel/types';

export const EntityInstance = ({
  entityType,
  id,
}: {
  entityType: string;
  id: number;
}) => {
  const entityMap = fetchEntityMap();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [entity, setEntity] = useState<Entity | undefined>(undefined);

  useEffect(() => {
    if (!entityType || !id) {
      return;
    }
    if (!entityMap.some((entity) => entity.code === entityType)) {
      return;
    }
    if (entity === undefined) {
      setLoading(true);
      fetchEntityById({ entityType, id })
        .then((data) => {
          setEntity(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [entity, entityMap, entityType, id]);

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

import React, { useState, useEffect } from 'react';
import {
  Card,
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { fetchEntityMap, fetchEntitiesForType } from '../../../api';
import { Entity } from './types';

export const EntityPanel = ({ entityType }: { entityType: string }) => {
  const entityMap = fetchEntityMap();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [entities, setEntities] = useState<Entity[] | undefined>(undefined);

  useEffect(() => {
    if (!entityType) {
      return;
    }
    if (!entityMap.some((entity) => entity.code === entityType)) {
      return;
    }
    if (entities === undefined) {
      setLoading(true);
      fetchEntitiesForType(entityType)
        .then((data) => {
          setEntities(data);
          setLoading(false);
        })
        .catch((err) => setError(err));
    }
  }, [entities, entityMap, entityType]);

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
      {entities?.length === 0 ? (
        <Box>No entities of type {entityType} available</Box>
      ) : (
        <List>
          {entities?.map((entity) => (
            <ListItem key={entity.id}>
              <a href={`/${entityType}/${entity.id}`}>{entity.name}</a>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

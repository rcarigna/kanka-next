import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Entity } from './types';
import { useKankaContext } from '@/contexts';

export const EntityPanel = ({ entityType }: { entityType: string }) => {
  const { entityTypes, selectedCampaign, fetchEntity } = useKankaContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [entities, setEntities] = useState<Entity[] | undefined>(undefined);

  const loadEntities = useCallback(async (results: Entity[]) => {
    setEntities(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!entityType) {
      return;
    }
    if (!entityTypes.some((entity) => entity.code === entityType)) {
      return;
    }
    if (entities === undefined) {
      setLoading(true);
      try {
        fetchEntity(entityType, loadEntities);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }
  }, [
    entities,
    entityType,
    entityTypes,
    fetchEntity,
    loadEntities,
    selectedCampaign,
  ]);

  if (
    !entityType ||
    !entityTypes.some((entity) => entity.code === entityType)
  ) {
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
    console.log('loading');
    return (
      <Box>
        <CircularProgress role='progressbar' />
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  if (error) {
    console.log('error');
    return (
      <Typography variant='h6' color='error' data-testid='entity-error-message'>
        {error.message}
      </Typography>
    );
  }
  console.log(`entities: ${entities?.length}`);
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

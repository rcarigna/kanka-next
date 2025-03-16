/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Card,
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useKankaContext } from '@/contexts';

export const EntityPanel = ({ entityType }: { entityType: string }) => {
  const { entities, entitiesLoading, entitiesError, entityTypes } =
    useKankaContext();

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

  if (entitiesLoading) {
    return (
      <Box>
        <CircularProgress role='progressbar' />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (entitiesError) {
    return (
      <Typography variant='h6' color='error' data-testid='entity-error-message'>
        {entitiesError.message}
      </Typography>
    );
  }

  return (
    <Card
      data-testid='entities-panel'
      style={{ paddingLeft: '30px', paddingRight: '30px' }}
    >
      {entities.length === 0 ? (
        <Box>No entities of type {entityType} available</Box>
      ) : (
        <List>
          {entities.map((entity: any) => (
            <ListItem key={entity.id}>
              <a href={`./${entityType}/${entity.id}`}>{entity.name}</a>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

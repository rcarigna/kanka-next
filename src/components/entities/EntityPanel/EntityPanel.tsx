/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useSWR from 'swr';
import {
  Card,
  List,
  ListItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useKankaContext } from '@/contexts';
import { fetchEntitiesForType } from '@/api';

export const EntityPanel = ({ entityType }: { entityType: string }) => {
  const { entityTypes, selectedCampaign } = useKankaContext();
  const {
    data: entities,
    isLoading: loading,
    error,
  } = useSWR(
    selectedCampaign ? { entityType, selectedCampaign } : null,
    fetchEntitiesForType
  );

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
          {entities?.map((entity: any) => (
            <ListItem key={entity.id}>
              <a href={`./${entityType}/${entity.id}`}>{entity.name}</a>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

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
  console.log(`entityType: ${entityType}`);
  console.log(`selectedCampaign: ${selectedCampaign}`);
  const {
    data: entities,
    isLoading: loading,
    error,
  } = useSWR(
    selectedCampaign ? ['entities', selectedCampaign, entityType] : null,
    fetchEntitiesForType
  );
  console.log(`entities: ${entities?.length}`);
  console.log(`loading: ${loading}`);
  console.log(`error: ${error}`);

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
          {entities?.map((entity: any) => (
            <ListItem key={entity.id}>
              <a href={`/${entityType}/${entity.id}`}>{entity.name}</a>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

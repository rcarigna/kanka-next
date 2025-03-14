'use client';
import React from 'react';
import useSWR from 'swr';
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

  const {
    data: entity,
    error,
    isLoading: loading,
  } = useSWR(
    selectedCampaign && entityType && id
      ? { entityType, selectedCampaign, id }
      : null,
    ({ entityType, selectedCampaign, id }) =>
      getEntityByID(entityType, selectedCampaign, id)
  );
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

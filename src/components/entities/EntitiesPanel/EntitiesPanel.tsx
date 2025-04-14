import React from 'react';
import { Card, List, ListItem, Box } from '@mui/material';
import { fetchEntityMap } from '../../../api/kanka';

export const EntityTypesPanel = () => {
  const entityMap = fetchEntityMap();
  return (
    <Card
      data-testid='entities-panel'
      style={{ paddingLeft: '30px', paddingRight: '30px' }}
    >
      {entityMap.length === 0 ? (
        <Box>No entity types available</Box>
      ) : (
        <List>
          {entityMap.map((entity) => (
            <ListItem key={entity.id}>{entity.code}</ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

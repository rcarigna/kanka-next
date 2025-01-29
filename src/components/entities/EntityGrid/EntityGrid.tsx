import React from 'react';
import { Grid2 as Grid } from '@mui/material';
import { EntityGridProps } from '../../../types';
import { StyledCard } from '../../../app/styles/styles';

export const EntityGrid: React.FC<EntityGridProps> = ({
  entities,
  dataTestId,
}) => {
  return (
    <Grid data-testid={dataTestId} container spacing={2}>
      {entities.map((entity, index) => (
        <Grid key={index}>
          <StyledCard
            elevation={3}
            sx={{ padding: 2, textAlign: 'center' }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {entity}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

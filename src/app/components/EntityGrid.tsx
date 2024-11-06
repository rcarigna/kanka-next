import React from 'react';
import { Paper, Grid2 as Grid } from '@mui/material';

type EntityGridProps = {
  entities: JSX.Element[];
};

export const EntityGrid: React.FC<EntityGridProps> = ({ entities }) => {
  return (
    <Grid container spacing={2}>
      {entities.map((entity, index) => (
        <Grid key={index}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            {entity}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

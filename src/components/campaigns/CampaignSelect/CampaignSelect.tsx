'use client';
import { CampaignsPanel } from '..';
import { Typography, Box } from '@mui/material';
import { useKankaContext } from '../../../contexts';

export const CampaignSelect = () => {
  const { campaigns } = useKankaContext();

  return (
    <Box>
      <Typography variant='h4' style={{ justifySelf: 'center' }}>
        Select a Campaign
      </Typography>
      {campaigns.length === 0 ? (
        <Typography variant='h6' style={{ justifySelf: 'center' }}>
          No campaigns found
        </Typography>
      ) : (
        <CampaignsPanel />
      )}
    </Box>
  );
};

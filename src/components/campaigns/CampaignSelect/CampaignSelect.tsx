'use client';
import { CampaignsPanel } from '..';
import { Typography, Box } from '@mui/material';
import { useKankaContext } from '../../../contexts';

export const CampaignSelect = () => {
  const { campaigns } = useKankaContext();

  return (
    <Box>
      <Typography variant='h4' style={{ alignSelf: 'center' }}>
        Select a Campaign
      </Typography>
      {campaigns.length === 0 ? (
        <Typography variant='h6' style={{ alignSelf: 'center' }}>
          No campaigns found
        </Typography>
      ) : (
        <CampaignsPanel campaigns={campaigns} />
      )}
    </Box>
  );
};

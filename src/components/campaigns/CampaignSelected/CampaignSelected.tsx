'use client';
import { Typography, Button, Box } from '@mui/material';
import { useKankaContext } from '../../../contexts';
import { useMemo } from 'react';

export const CampaignSelected = () => {
  const { campaigns, selectedCampaign, setSelectedCampaign } =
    useKankaContext();

  const selectedCampaignData = useMemo(() => {
    if (!campaigns || !selectedCampaign) {
      return undefined;
    }
    const selectedCampaignRawData = campaigns.find(
      (c) => c.id === selectedCampaign
    );
    if (!selectedCampaignRawData) {
      return undefined;
    }

    const domParser = new DOMParser();
    const textEntry: string =
      domParser.parseFromString(selectedCampaignRawData.entry, 'text/html')
        ?.body?.textContent || 'No description available.';
    return { ...selectedCampaignRawData, entry: textEntry };
  }, [campaigns, selectedCampaign]);
  return (
    <Box>
      <Button
        onClick={() => setSelectedCampaign(undefined)}
        style={{ marginBottom: '1rem' }}
      >
        Back to Campaigns
      </Button>
      <Typography variant='h4'>{selectedCampaignData?.name}</Typography>
      <Typography variant='body1'>{selectedCampaignData?.entry}</Typography>
      {/* Add other campaign-specific components here */}
    </Box>
  );
};

'use client';
import { Typography, Box } from '@mui/material';
import { useKankaContext } from '../../../contexts';
import { useMemo } from 'react';
import { CampaignType } from '../../../types';

export const NO_ENTRY_TEXT = 'No introduction available.';

export const CampaignSelected = () => {
  const { campaigns, selectedCampaign } = useKankaContext();

  const selectedCampaignData: CampaignType | undefined = useMemo(() => {
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
        ?.body?.textContent || NO_ENTRY_TEXT;
    return { ...selectedCampaignRawData, entry: textEntry };
  }, [campaigns, selectedCampaign]);

  return (
    <Box>
      {selectedCampaignData ? (
        <Box>
          {selectedCampaignData?.entry !== NO_ENTRY_TEXT && (
            <Typography variant='h5' style={{ justifySelf: 'center' }}>
              Introduction
            </Typography>
          )}
          <Typography variant='body1'>{selectedCampaignData?.entry}</Typography>
        </Box>
      ) : (
        <Typography variant='h4'>Problem with campaign selected</Typography>
      )}
    </Box>
  );
};

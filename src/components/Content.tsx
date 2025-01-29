'use client';
import { CampaignsPanel } from './campaigns';
import { Typography, Button, Card } from '@mui/material';
import { StyledCTAs } from '../app/styles/styles';
import { useKankaContext } from '../contexts';
import { ConnectionWrapper } from './ConnectionWrapper';
import { useMemo } from 'react';

const SelectCampaign = () => {
  const { campaigns } = useKankaContext();

  return (
    <>
      <Typography variant='h4' style={{ alignSelf: 'center' }}>
        Select a Campaign
      </Typography>
      <CampaignsPanel campaigns={campaigns || []} />
    </>
  );
};
const SelectedCampaign = () => {
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
    <>
      <Button
        onClick={() => setSelectedCampaign(undefined)}
        style={{ marginBottom: '1rem' }}
      >
        Back to Campaigns
      </Button>
      <Typography variant='h4'>{selectedCampaignData?.name}</Typography>
      <Typography variant='body1'>{selectedCampaignData?.entry}</Typography>
      {/* Add other campaign-specific components here */}
    </>
  );
};

const InnerContent = () => {
  const { selectedCampaign } = useKankaContext();

  return (
    <Card
      style={{
        padding: '1rem',
        // width: '80%',
        minWidth: '600px',
        alignSelf: 'center',
      }}
    >
      {selectedCampaign ? <SelectedCampaign /> : <SelectCampaign />}
    </Card>
  );
};

export const Content = () => (
  <StyledCTAs>
    <ConnectionWrapper>
      <InnerContent />
    </ConnectionWrapper>
  </StyledCTAs>
);

'use client';
import { Typography, Box, Button, Link } from '@mui/material';
import { useKankaContext } from '../../../contexts';
import { EntityGrid } from '@/components/entities';
import { OpenInNew } from '@mui/icons-material';
import { StyledPanel } from '../styles';
import { useKankaConnection } from '@/hooks';

export const CampaignSelect = () => {
  const { campaigns, setSelectedCampaign } = useKankaContext();
  const { baseUrl } = useKankaConnection().connection;

  const campaignPreviews = campaigns?.map((campaign) => (
    <StyledPanel
      data-testid={`campaign-panel-preview-${campaign.id}`}
      key={`campaign-panel-preview-${campaign.id}`}
    >
      <Button onClick={() => setSelectedCampaign(campaign.id)}>
        <Typography>{campaign.name}</Typography>
      </Button>
      <Link href={`${baseUrl}/w/${campaign.id}`}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  ));
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
        <EntityGrid
          dataTestId='entity-grid-campaigns-panel'
          entities={campaignPreviews}
        />
      )}
    </Box>
  );
};

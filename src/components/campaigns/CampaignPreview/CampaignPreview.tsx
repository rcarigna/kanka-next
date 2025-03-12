import { Typography, Link, Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CampaignType } from '../../../types';
import { StyledPanel } from '../styles';
import { useKankaContext } from '../../../contexts';
import { useKankaConnection } from '@/hooks';

export const CampaignPreview = ({
  campaign,
}: {
  campaign: CampaignType;
}): JSX.Element => {
  const { setSelectedCampaign } = useKankaContext();
  const { baseUrl } = useKankaConnection().connection;

  const campaignUrl = `${baseUrl}/w/${campaign.id}`;
  return (
    <StyledPanel data-testid={`campaign-panel-preview-${campaign.id}`}>
      <Button onClick={() => setSelectedCampaign(campaign.id)}>
        <Typography>{campaign.name}</Typography>
      </Button>
      <Link href={campaignUrl}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  );
};

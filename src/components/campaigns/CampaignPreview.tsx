import { Typography, Link, Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CampaignType } from '../../types';
import { StyledPanel } from './styles';
import { useKankaContext } from '../../contexts';

export const CampaignPreview = ({
  campaign,
}: {
  campaign: CampaignType;
}): JSX.Element => {
  const {
    connection: {
      connection: { baseUrl },
    },
    setSelectedCampaign,
  } = useKankaContext();

  const campaignUrl = `${baseUrl}/w/${campaign.id}`;
  return (
    <StyledPanel>
      <Button onClick={() => setSelectedCampaign(campaign.id)}>
        <Typography>{campaign.name}</Typography>
      </Button>
      <Link href={campaignUrl}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  );
};

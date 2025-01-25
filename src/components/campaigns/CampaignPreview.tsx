import { Typography, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CampaignType } from '../../types';
import { StyledPanel } from './styles';
import { useKankaContext } from '../../contexts';
export const CampaignPreview = ({
  campaign,
}: {
  campaign: CampaignType;
}): JSX.Element => {
  const { baseUrl } = useKankaContext().connection.connection;
  const campaignUrl = `${baseUrl}/w/${campaign.id}`;
  return (
    <StyledPanel>
      <Typography>{campaign.name}</Typography>
      <Link href={campaignUrl}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  );
};

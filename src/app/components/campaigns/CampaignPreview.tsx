import { Typography, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CampaignType } from '../../contexts';
import { StyledPanel } from './styles';

export const CampaignPreview = ({
  campaign,
  baseURL,
}: {
  campaign: CampaignType;
  baseURL: string;
}): JSX.Element => {
  const campaignUrl = `${baseURL}/w/${campaign.id}`;
  return (
    <StyledPanel>
      <Typography>{campaign.name}</Typography>
      <Link href={campaignUrl}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  );
};

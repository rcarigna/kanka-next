import { Typography, Link } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { CampaignType } from '../../contexts';
import styled from 'styled-components';

const StyledPanel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const CampaignPreview = ({
  campaign,
}: {
  campaign: CampaignType;
}): JSX.Element => {
  const campaignUrl = `https://app.kanka.io/w/${campaign.id}`;
  return (
    <StyledPanel>
      <Typography>{campaign.name}</Typography>
      <Link href={campaignUrl}>
        <OpenInNew />
      </Link>
    </StyledPanel>
  );
};

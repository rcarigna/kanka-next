import { useKankaContext } from '@/contexts';
import { Box, Typography } from '@mui/material';

export const CampaignHeader = () => {
  const { selectedCampaign, campaigns } = useKankaContext();
  const campaignName = campaigns.find(
    (campaign) => campaign.id === selectedCampaign
  )?.name;
  return campaignName ? (
    <Box data-testid='campaign-header'>
      <Typography variant='h4'>{campaignName}</Typography>
    </Box>
  ) : null;
};

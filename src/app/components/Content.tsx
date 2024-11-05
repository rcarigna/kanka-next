import CampaignDropdown from './CampaignDropdown';
import { CircularProgress, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { StyledCTAs } from '../styles';
import { useKankaContext } from '../contexts';

const InnerContent = () => {
  const { status, error } = useKankaContext();

  if (status === 'loading') {
    return (
      <div>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div>
        <ErrorOutlineIcon />
        <Typography>Error: {error}</Typography>
      </div>
    );
  }

  return <CampaignDropdown />;
};

export const Content = () => (
  <StyledCTAs>
    <InnerContent />
  </StyledCTAs>
);

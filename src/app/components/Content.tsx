import CampaignDropdown from './CampaignDropdown';
import { Login } from './Login';
import { CircularProgress, Typography, Alert, Button } from '@mui/material';
import { StyledCTAs } from '../styles';
import { useKankaContext } from '../contexts';

const InnerContent = () => {
  const { connection, error } = useKankaContext().connection;
  const { status } = connection;
  switch (status) {
    case 'loading':
      return (
        <div>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </div>
      );
    case 'invalid':
      return (
        <>
          <Alert severity='error'>{error}</Alert>
          <Button onClick={connection.clearApiKey}>Try again?</Button>
        </>
      );
    case 'apiKeyMissing':
      return <Login />;
    case 'valid':
    default:
      return <CampaignDropdown />;
  }
};

export const Content = () => (
  <StyledCTAs>
    <InnerContent />
  </StyledCTAs>
);

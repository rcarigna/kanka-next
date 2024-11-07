'use client';
import { CampaignsPanel } from './campaigns';
import { Login } from './Login';
import { CircularProgress, Typography, Alert, Button } from '@mui/material';
import { StyledCTAs } from './styles';
import { useKankaContext } from '../contexts';

const InnerContent = () => {
  const { connection: kankaConnection, campaigns } = useKankaContext();
  const { connection, error } = kankaConnection;
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
      return <CampaignsPanel campaigns={campaigns || []} />;
  }
};

export const Content = () => (
  <StyledCTAs>
    <InnerContent />
  </StyledCTAs>
);

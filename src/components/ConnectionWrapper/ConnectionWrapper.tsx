'use client';

import { CircularProgress, Typography, Alert, Button } from '@mui/material';
import { Login } from '../Login';
import { useKankaConnection } from '@/hooks';

export const ConnectionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connection, error } = useKankaConnection();
  const { status, clearApiKey } = connection;

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
          <Button onClick={clearApiKey}>Try again?</Button>
        </>
      );

    case 'apiKeyMissing':
      return <Login />;

    case 'valid':
    default:
      return <>{children}</>;
  }
};

'use client';

import { CircularProgress, Typography, Alert, Button } from '@mui/material';
import { Login } from './Login';
import { useKankaContext } from '../contexts';

export const ConnectionWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connection: kankaConnection } = useKankaContext();
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
      return <>{children}</>;
  }
};

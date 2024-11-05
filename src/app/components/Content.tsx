/* eslint-disable @typescript-eslint/no-explicit-any */

import CampaignDropdown from './CampaignDropdown';
import { CircularProgress, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ConnectionStatus } from '../contexts/types';

export const Content = ({
  status,
  error,
}: {
  status: ConnectionStatus;
  error: any;
}) => {
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

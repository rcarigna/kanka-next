import { Alert } from '@mui/material';

export const Error = ({ error }: { error: string }) => (
  <Alert severity='error'>{error}</Alert>
);

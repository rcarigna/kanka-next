import { Alert } from '@mui/material';

export const Error = (error: string) => <Alert severity='error'>{error}</Alert>;

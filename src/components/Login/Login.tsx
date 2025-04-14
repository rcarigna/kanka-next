'use client';
import React, { useState } from 'react';
import { TextField, Button, FormControl, Link } from '@mui/material';
import { StyledKeyFooter, StyledHelperLink } from '../../app/styles/styles';
import { useKankaConnection } from '@/hooks';

export const Login: React.FC = () => {
  const [keyInput, setKeyInput] = useState('');
  const { connection } = useKankaConnection();

  const handleLogin = () => {
    if (keyInput !== '') {
      connection.setApiKey(keyInput);
      setKeyInput(''); // Clear input field
    }
  };

  return (
    <FormControl>
      <TextField
        label='Please provide API key'
        type='password'
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        placeholder='Enter API Key'
      />
      <StyledKeyFooter id='styledKeyFooter'>
        <StyledHelperLink>
          <Link
            underline='none'
            target='_blank'
            href='https://app.kanka.io/settings/api'
          >
            Need a personal access token?
          </Link>
        </StyledHelperLink>
        <Button
          variant='contained'
          disabled={keyInput === ''}
          onClick={handleLogin}
        >
          Authenticate
        </Button>
      </StyledKeyFooter>
    </FormControl>
  );
};

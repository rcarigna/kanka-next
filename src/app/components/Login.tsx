import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, FormControl, Link } from '@mui/material';
import { useKankaContext } from '../contexts/KankaContext';

const StyledKeyFooter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 4px;
  gap: 4px;
`;
const StyledHelperLink = styled.div`
  display: flex;
  align-content: start;
  flex-direction: row;
  font-size: 10px;
`;

export const Login: React.FC = () => {
  const [keyInput, setKeyInput] = useState('');
  const { connection } = useKankaContext().connection;

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

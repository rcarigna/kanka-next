'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  ConnectionStatus,
  KankaConnectionType,
  ConnectionType,
} from '../types';
import { validateConnection } from '../api';

export const useKankaConnection = (): KankaConnectionType => {
  const [status, setStatus] = useState<ConnectionStatus>('loading');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any | null>(null);
  const [apiKey, setApiKey] = useState<string | undefined>(
    () =>
      localStorage.getItem('apiKey') ||
      process.env.NEXT_PUBLIC_API_KEY ||
      undefined
  );
  const [baseUrl, setBaseUrl] = useState<string>(
    () =>
      localStorage.getItem('baseUrl') || process.env.NEXT_PUBLIC_BASE_URL || ''
  );
  useEffect(() => {
    if (apiKey) localStorage.setItem('apiKey', apiKey);
    if (baseUrl) localStorage.setItem('baseUrl', baseUrl);
  }, [apiKey, baseUrl]);

  const connection: ConnectionType = useMemo(
    () => ({
      apiKey,
      setApiKey: (key: string | undefined) => {
        setApiKey(key);
        if (key) localStorage.setItem('apiKey', key);
        else localStorage.removeItem('apiKey');
      },
      clearApiKey: () => {
        setApiKey(undefined);
        localStorage.removeItem('apiKey');
      },
      baseUrl,
      setBaseUrl,
      status,
    }),
    [apiKey, baseUrl, status]
  );

  // Validate the connection
  useEffect(() => {
    const validate = async () => {
      if (!apiKey || !baseUrl) {
        setStatus('apiKeyMissing');
        setError('API key is missing');
        return;
      }

      const result = await validateConnection(apiKey, baseUrl);
      setStatus(result);
      setError(result === 'invalid' ? 'Failed to validate connection' : null);
    };

    validate();
  }, [apiKey, baseUrl]);

  return {
    connection,
    error,
  };
};

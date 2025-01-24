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
    process.env.NEXT_PUBLIC_API_KEY || undefined
  );
  const [baseUrl, setBaseUrl] = useState<string>(
    process.env.NEXT_PUBLIC_BASE_URL || ''
  );

  const connection: ConnectionType = useMemo(
    () => ({
      apiKey,
      setApiKey,
      clearApiKey: () => setApiKey(undefined),
      baseUrl,
      setBaseUrl,
      status,
    }),
    [apiKey, baseUrl, status]
  );

  // Validate the connection
  useEffect(() => {
    const validate = async () => {
      if (apiKey && baseUrl) {
        const result = await validateConnection(apiKey, baseUrl);
        setStatus(result);
        if (result === 'valid') {
          setError(null);
        }
        if (result === 'invalid') {
          setError('Failed to validate connection');
        }
      } else {
        setStatus('apiKeyMissing');
        setError('API key is missing');
      }
    };

    validate();
  }, [apiKey, baseUrl]);

  return {
    connection: connection,
    error: error,
  };
};

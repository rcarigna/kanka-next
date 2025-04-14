'use client';
import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import {
  ConnectionStatus,
  KankaConnectionType,
  ConnectionType,
} from '../types';
import { validateConnection } from '../api';

// initial state: new
// if loading, status is loading
// if no API key, status is apiKeyMissing
// if API key is invalid, status is invalid
// if API key is valid, status is valid
// check if the api key is valid if both api key and base url are present AND it has not been validated or in the process of being validated
export const useKankaConnection = (): KankaConnectionType => {
  // const [status, setStatus] = useState<ConnectionStatus>('new');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [error, setError] = useState<any | null>(null);
  // @ts-expect-error - TS thinks there's a chance of getItem being null but there's not
  const [apiKey, setApiKey] = useState<string | undefined>(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('apiKey') !== null
    ) {
      return localStorage.getItem('apiKey');
    }
    return process.env.NEXT_PUBLIC_API_KEY || undefined;
  });
  // @ts-expect-error - TS thinks there's a chance of getItem being null but there's not
  const [baseUrl, setBaseUrl] = useState<string>(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('baseUrl') !== null
    ) {
      return localStorage.getItem('baseUrl');
    }
    return process.env.NEXT_PUBLIC_BASE_URL || '';
  });

  // store the api key and base url in local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (apiKey && localStorage.getItem('apiKey') === null)
        localStorage.setItem('apiKey', apiKey);
      if (baseUrl && localStorage.getItem('baseUrl') === null)
        localStorage.setItem('baseUrl', baseUrl);
    }
  }, [apiKey, baseUrl]);

  const validationKey = useMemo(
    () => (apiKey && baseUrl ? [apiKey, baseUrl] : null),
    [apiKey, baseUrl]
  );

  const {
    data: validationResult,
    error,
    isLoading: loading,
  } = useSWR(validationKey, () => validateConnection(apiKey || '', baseUrl), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const status: ConnectionStatus = useMemo(() => {
    console.log(
      `updating status. apiKey set: ${Boolean(apiKey)}, baseURL set: ${Boolean(baseUrl)} loading: ${loading}, error: ${error}, validationResult: ${validationResult}`
    );
    if (!apiKey) return 'apiKeyMissing';
    if (error) return 'invalid';
    if (loading) return 'loading';
    if (validationResult === 'valid') return 'valid';
    if (validationResult === 'invalid') return 'invalid';
    return 'new';
  }, [apiKey, baseUrl, loading, error, validationResult]);

  const connection: ConnectionType = useMemo(
    () => ({
      apiKey,
      setApiKey: (key: string | undefined) => {
        console.log('setting api key', key);
        setApiKey(key);
        // either update or remove the api key from local storage
        if (typeof window !== 'undefined') {
          if (key) {
            if (localStorage.getItem('apiKey') !== key) {
              localStorage.setItem('apiKey', key);
            }
          } else localStorage.removeItem('apiKey');
        }
      },
      clearApiKey: () => {
        setApiKey(undefined);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('apiKey');
        }
      },
      baseUrl,
      setBaseUrl: (url: string) => {
        console.log('setting base url', url);
        setBaseUrl(url);
        if (
          typeof window !== 'undefined' &&
          localStorage.getItem('baseUrl') !== url
        ) {
          localStorage.setItem('baseUrl', url);
        }
      },
      status,
    }),
    [apiKey, baseUrl, status]
  );

  // Validate the connection
  // useEffect(() => {
  //   const validate = async () => {
  //     if (!apiKey || !baseUrl) {
  //       setStatus('apiKeyMissing');
  //       setError('API key is missing');
  //       return;
  //     }

  //     const result = await validateConnection(apiKey, baseUrl);
  //     setStatus(result);
  //     setError(result === 'invalid' ? 'Failed to validate connection' : null);
  //   };

  //   validate();
  // }, [apiKey, baseUrl]);

  return {
    connection,
    error,
  };
};

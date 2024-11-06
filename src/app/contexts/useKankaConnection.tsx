/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ConnectionStatus,
  fetchFromEndpointType,
  validateConnectionType,
  KankaConnectionType,
  ConnectionType,
} from './types';
import { KANKA_API_KEY, KANKA_BASE_URL } from './constants';

export const validateConnection = async ({
  apiKey,
  setError,
  setStatus,
  commonHeaders,
  baseUrl,
}: validateConnectionType) => {
  if (!apiKey) {
    setError('API key is missing');
    setStatus('invalid');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/campaigns`, {
      headers: commonHeaders,
    });

    if (response.ok) {
      setStatus('valid');
    } else {
      setStatus('invalid');
      setError(`Error fetching from ${baseUrl}/campaigns.`);
    }
  } catch {
    setStatus('invalid');
    setError('Failed to validate connection');
  }
};

export const fetchFromEndpoint = async ({
  status,
  endpoint,
  baseUrl,
  commonHeaders,
  setError,
}: fetchFromEndpointType): Promise<any[] | null> => {
  if (status !== 'valid') return null;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: commonHeaders,
    });

    if (!response.ok) {
      throw new Error(`Error fetching data from ${endpoint}`);
    }

    const { data: fetchedData } = await response.json();
    return fetchedData;
  } catch (err: any) {
    setError(err.message);
    return null;
  }
};

export const useKankaConnection = (): KankaConnectionType => {
  const [status, setStatus] = useState<ConnectionStatus>('loading');

  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [baseUrl, setBaseUrl] = useState<string>('https://api.kanka.io/1.0');

  const clearApiKey = () => {
    setApiKey(undefined);
    setStatus('apiKeyMissing');
  };

  const connection: ConnectionType = useMemo(
    () => ({ apiKey, setApiKey, clearApiKey, baseUrl, status }),
    [apiKey, baseUrl, status]
  );

  const commonHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${apiKey}`,
      'Content-type': 'application/json',
    }),
    [apiKey]
  );

  // load the apiKey & baseUrl
  useEffect(() => {
    if (!apiKey && KANKA_API_KEY) {
      setApiKey(KANKA_API_KEY);
    }
    if (!apiKey && !KANKA_API_KEY) {
      setStatus('apiKeyMissing');
    }
    if (KANKA_BASE_URL && KANKA_BASE_URL !== baseUrl) {
      setBaseUrl(KANKA_BASE_URL);
    }
  }, [apiKey, baseUrl]);

  // once the apiKey & baseUrl are loaded, validate the connection
  useEffect(() => {
    if (apiKey && baseUrl) {
      validateConnection({
        apiKey,
        setError,
        setStatus,
        commonHeaders,
        baseUrl,
      });
    }
  }, [apiKey, baseUrl, commonHeaders]);

  const fetchData = useCallback(
    ({
      endpoint,
      save,
    }: {
      endpoint: string;
      save: (value: any[]) => void;
    }) => {
      if (baseUrl) {
        fetchFromEndpoint({
          status,
          endpoint,
          baseUrl,
          commonHeaders,
          setError,
        }).then((result: any[] | null) => {
          if (result) {
            save(result);
            setLoading(false);
          }
        });
      }
    },
    [baseUrl, commonHeaders, status]
  );

  return {
    connection: connection,
    loading: loading,
    error: error,
    fetchData: fetchData,
  };
};

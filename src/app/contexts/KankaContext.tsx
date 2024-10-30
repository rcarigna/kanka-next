/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { ConnectionStatus, KankaContextType } from './types';

const KankaContext = createContext<KankaContextType | undefined>(undefined);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<ConnectionStatus>('loading');
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const commonHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${apiKey}`,
      'Content-type': 'application/json',
    }),
    [apiKey]
  );

  // Initial connection validation
  useEffect(() => {
    const validateConnection = async () => {
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
          setError('Invalid API key');
        }
      } catch {
        setStatus('invalid');
        setError('Failed to validate connection');
      }
    };

    validateConnection();
  }, [apiKey, baseUrl, commonHeaders]);

  // Fetch data function available to consumers
  const fetchData = useCallback(
    async (endpoint: string): Promise<any[] | null> => {
      if (status !== 'valid') return null;

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          headers: commonHeaders,
        });

        if (!response.ok) {
          throw new Error(`Error fetching data from ${endpoint}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData); // Store the fetched data in context
        return fetchedData;
      } catch (err: any) {
        setError(err.message);
        return null;
      }
    },
    [baseUrl, commonHeaders, status]
  );

  useEffect(() => {
    const loadCampaignOptions = async () => {
      if (status === 'valid' && loading) {
        await fetchData(`/campaigns`);
        setLoading(false);
      }
    };

    loadCampaignOptions();
  }, [status, fetchData, loading, baseUrl]);

  return (
    <KankaContext.Provider value={{ status, error, data, fetchData }}>
      {children}
    </KankaContext.Provider>
  );
};

export const useKankaContext = () => {
  const context = useContext(KankaContext);
  if (!context) {
    throw new Error('useKankaContext must be used within a DataProvider');
  }
  return context;
};

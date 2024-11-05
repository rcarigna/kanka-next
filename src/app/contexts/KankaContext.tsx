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
import {
  CampaignType,
  ConnectionStatus,
  fetchFromEndpointType,
  KankaContextType,
  validateConnectionType,
  KankaConnectionType,
} from './types';
import { KANKA_API_KEY, KANKA_BASE_URL } from './constants';

export const KankaContext = createContext<KankaContextType | undefined>(
  undefined
);

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

  const apiKey = KANKA_API_KEY;
  const baseUrl = KANKA_BASE_URL;
  const commonHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${apiKey}`,
      'Content-type': 'application/json',
    }),
    [apiKey]
  );

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
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  useEffect(() => {
    const loadCampaignOptions = async () => {
      if (status === 'valid' && loading) {
        fetchData({ endpoint: `/campaigns`, save: setCampaigns });
      }
    };
    loadCampaignOptions();
  }, [status, fetchData, loading]);
  return {
    status: status,
    loading: loading,
    error: error,
    fetchData: fetchData,
    campaigns: campaigns,
  };
};

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  // const [status, setStatus] = useState<ConnectionStatus>('loading');
  // const [error, setError] = useState<any | null>(null);
  // const [loading, setLoading] = useState(true);

  // const apiKey = KANKA_API_KEY;
  // const baseUrl = KANKA_BASE_URL;
  // const commonHeaders = useMemo(
  //   () => ({
  //     Authorization: `Bearer ${apiKey}`,
  //     'Content-type': 'application/json',
  //   }),
  //   [apiKey]
  // );

  // const [campaigns, setCampaigns] = useState<CampaignType[]>([]);

  // useEffect(() => {
  //   if (apiKey && baseUrl) {
  //     validateConnection({
  //       apiKey,
  //       setError,
  //       setStatus,
  //       commonHeaders,
  //       baseUrl,
  //     });
  //   }
  // }, [apiKey, baseUrl, commonHeaders]);

  // // Fetch data function available to consumers
  // const fetchData = useCallback(
  //   ({
  //     endpoint,
  //     save,
  //   }: {
  //     endpoint: string;
  //     save: (value: any[]) => void;
  //   }) => {
  //     if (baseUrl) {
  //       fetchFromEndpoint({
  //         status,
  //         endpoint,
  //         baseUrl,
  //         commonHeaders,
  //         setError,
  //       }).then((result: any[] | null) => {
  //         if (result) {
  //           save(result);
  //         }
  //       });
  //     }
  //   },
  //   [baseUrl, commonHeaders, status]
  // );
  const { status, error, fetchData, campaigns } = useKankaConnection();

  // useEffect(() => {
  //   const loadCampaignOptions = async () => {
  //     if (status === 'valid' && loading) {
  //       fetchData({ endpoint: `/campaigns`, save: setCampaigns });
  //     }
  //   };
  //   loadCampaignOptions();
  // }, [status, fetchData, loading]);

  return (
    <KankaContext.Provider
      value={{ status, error, campaigns: campaigns, fetchData }}
    >
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

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { KankaContextType, KankaItem } from './types';

const KankaContext = createContext<KankaContextType | undefined>(undefined);

export const KankaDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<KankaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.kanka.io/1.0/campaigns', {
            headers: {
              Authorization: 'Bearer {REPLACEME}',
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const result = await response.json();
            console.log(
              `response is ok. setting data. ${JSON.stringify(result)}`
            );
            setData(result.data);
          }
          setLoading(false);
          console.log('setting loading to false');
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };

      fetchData();
    }
  }, [loading]);

  return (
    <KankaContext.Provider value={{ data }}>{children}</KankaContext.Provider>
  );
};

export const useKankaContext = () => {
  const context = useContext(KankaContext);
  if (!context) {
    throw new Error('useKankaContext must be used within a DataProvider');
  }
  return context;
};

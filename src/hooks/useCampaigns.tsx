import { useState, useEffect } from 'react';
import { getCampaigns } from '../api/kankaApi';
import { CampaignType } from '../types';

export const useCampaigns = (isConnectionReady: boolean) => {
  const [campaigns, setCampaigns] = useState<CampaignType[] | undefined>(
    undefined
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useEffect in useCampaigns called');

    const fetchCampaigns = async () => {
      if (!isConnectionReady) {
        return;
      }
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchCampaigns();
  }, [isConnectionReady]);

  return { campaigns, error, resetError: () => setError(null) };
};

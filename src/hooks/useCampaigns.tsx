import { useState, useEffect } from 'react';
import { getCampaigns } from '../api/kankaApi';
import { CampaignType } from '../types';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchCampaigns();
  }, []);

  return { campaigns, error };
};

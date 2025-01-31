import { renderHook } from '@testing-library/react-hooks';
import { useCampaigns } from './useCampaigns';
import { getCampaigns } from '../api/kankaApi';
import { CampaignType } from '../types';

jest.mock('../api/kankaApi');

describe('useCampaigns', () => {
  it('should fetch campaigns successfully', async () => {
    const mockCampaigns: CampaignType[] = [
      {
        id: 1,
        name: 'Test Campaign',
        locale: null,
        entry: '',
        entry_parsed: '',
        image: null,
        image_full: null,
        image_thumb: null,
        visibility: '',
        visibility_id: 0,
        created_at: '',
        updated_at: '',
      },
    ];
    (getCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

    const { result, waitForNextUpdate } = renderHook(() => useCampaigns());

    await waitForNextUpdate();

    expect(result.current.campaigns).toEqual(mockCampaigns);
    expect(result.current.error).toBeNull();
  });

  it('should handle error while fetching campaigns', async () => {
    const mockError = new Error('Failed to fetch campaigns');
    (getCampaigns as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useCampaigns());

    await waitForNextUpdate();

    expect(result.current.campaigns).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchEntity } from './useFetchEntity';
import { fetchEntitiesForType } from '../api/kankaApi';

jest.mock('../api/kankaApi');

describe('useFetchEntity', () => {
  const mockFetchEntitiesForType = fetchEntitiesForType as jest.MockedFunction<
    typeof fetchEntitiesForType
  >;

  it('should fetch entities successfully', async () => {
    const mockData = [{ id: 1, name: 'Entity 1' }];
    mockFetchEntitiesForType.mockResolvedValueOnce(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useFetchEntity(1));

    act(() => {
      result.current.fetchEntity('type1');
    });

    await waitForNextUpdate();

    expect(result.current.entities).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Failed to fetch');
    mockFetchEntitiesForType.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetchEntity(1));

    act(() => {
      result.current.fetchEntity('type1');
    });

    await waitForNextUpdate();

    expect(result.current.entities).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  });

  it('should not fetch entities if selectedCampaign is undefined', async () => {
    const { result } = renderHook(() => useFetchEntity(undefined));

    act(() => {
      result.current.fetchEntity('type1');
    });

    expect(result.current.entities).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(mockFetchEntitiesForType).not.toHaveBeenCalled();
  });
});

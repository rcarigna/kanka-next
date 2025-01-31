import { renderHook } from '@testing-library/react-hooks';
import { useEntities } from './useEntities';
import { getEntityTypes } from '../api/kankaApi';
import { EntityType } from '../types';

jest.mock('../api/kankaApi');

describe('useEntities', () => {
  const mockEntities: EntityType[] = [
    { id: 1, code: 'Entity 1' },
    { id: 2, code: 'Entity 2' },
  ];

  beforeEach(() => {
    (getEntityTypes as jest.Mock).mockResolvedValue(mockEntities);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and set entities when selectedCampaign is provided', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEntities(1));

    await waitForNextUpdate();

    expect(result.current.entities).toEqual(mockEntities);
    expect(result.current.error).toBeNull();
    expect(getEntityTypes).toHaveBeenCalled();
  });

  it('should set error when fetching entities fails', async () => {
    const mockError = new Error('Failed to fetch entities');
    (getEntityTypes as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useEntities(1));

    await waitForNextUpdate();

    expect(result.current.entities).toEqual([]);
    expect(result.current.error).toEqual(mockError);
    expect(getEntityTypes).toHaveBeenCalled();
  });
});

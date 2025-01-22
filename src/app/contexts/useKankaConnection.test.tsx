import { renderHook, act } from '@testing-library/react-hooks';
import { useKankaConnection } from './useKankaConnection';

describe('useKankaConnection', () => {
  // Mock the fetch function
  const fetchMock = jest.fn();
  global.fetch = fetchMock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set apiKey to undefined and status to apiKeyMissing when clearApiKey is called', () => {
    const { result } = renderHook(() => useKankaConnection());

    act(() => {
      result.current.connection.setApiKey('test-api-key');
    });

    expect(result.current.connection.apiKey).toBe('test-api-key');

    act(() => {
      result.current.connection.clearApiKey();
    });

    expect(result.current.connection.apiKey).toBeUndefined();
    expect(result.current.connection.status).toBe('apiKeyMissing');
  });

  it('should set apiKey to undefined and status to apiKeyMissing when clearApiKey is called', () => {
    const { result } = renderHook(() => useKankaConnection());

    act(() => {
      result.current.connection.setApiKey('test-api-key');
    });

    expect(result.current.connection.apiKey).toBe('test-api-key');

    act(() => {
      result.current.connection.clearApiKey();
    });

    expect(result.current.connection.apiKey).toBeUndefined();
    expect(result.current.connection.status).toBe('apiKeyMissing');
  });

  it('should set apiKey when setApiKey is called', () => {
    const { result } = renderHook(() => useKankaConnection());

    act(() => {
      result.current.connection.setApiKey('new-api-key');
    });

    expect(result.current.connection.apiKey).toBe('new-api-key');
  });

  it('should set status to invalid and set error when validateConnection fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('invalid-api-key');
    });

    await waitForNextUpdate();

    expect(result.current.error).toBeTruthy();
    expect(result.current.connection.status).toBe('invalid');
    expect(result.current.error).toBe('Failed to validate connection');
  });

  it('should set status to invalid and set error when fetch is not ok', async () => {
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: 'mocked data' }),
      ok: false,
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('invalid-api-key');
    });

    await waitForNextUpdate();

    expect(result.current.error).toBeTruthy();
    expect(result.current.connection.status).toBe('invalid');
    expect(result.current.error).toBe(
      'Error fetching from https://api.kanka.io/1.0/campaigns.'
    );
  });

  it('should set status to valid when validateConnection succeeds', async () => {
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ data: 'mocked data' }),
      ok: true,
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('valid-api-key');
    });

    await waitForNextUpdate();

    expect(result.current.error).toBeNull();
    expect(result.current.connection.status).toBe('valid');
  });

  it('should fetch data from endpoint', async () => {
    fetchMock.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({ data: 'mocked data' }),
      ok: true,
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('valid-api-key');
    });

    await waitForNextUpdate();

    const saveMock = jest.fn();
    act(() => {
      result.current.fetchData({
        endpoint: '/test-endpoint',
        save: saveMock,
      });
    });

    await waitForNextUpdate();

    expect(saveMock).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalledWith('mocked data');
    expect(result.current.loading).toBe(false);
  });

  it('should throw an error when failing to fetch data from endpoint', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('valid-api-key');
    });

    await waitForNextUpdate();

    fetchMock.mockResolvedValue({
      ok: false,
    });
    const saveMock = jest.fn();
    act(() => {
      result.current.fetchData({
        endpoint: '/test-endpoint',
        save: saveMock,
      });
    });

    await waitForNextUpdate();
    expect(result.current.error).toBeTruthy();
    expect(result.current.error).toBe(
      'Error fetching data from /test-endpoint'
    );
  });
});
// });

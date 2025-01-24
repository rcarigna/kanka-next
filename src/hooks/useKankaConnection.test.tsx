import { renderHook, act } from '@testing-library/react-hooks';
import { useKankaConnection } from './useKankaConnection';
import * as api from '../api';
import { waitFor } from '@testing-library/react';

jest.mock('../api');

describe('useKankaConnection', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clear the cache
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_KEY: 'mock-api-key',
      NEXT_PUBLIC_BASE_URL: 'mock-base-url',
    }; // Make a copy
  });

  afterEach(() => {
    process.env = originalEnv; // Restore the original environment
    jest.clearAllMocks();
  });
  it('should set apiKey to undefined and status to apiKeyMissing when clearApiKey is called', () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_API_KEY: undefined,
      NEXT_PUBLIC_BASE_URL: undefined,
    };
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
    process.env = originalEnv;
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
    (api.validateConnection as jest.Mock).mockResolvedValue('invalid');

    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('invalid-api-key');
    });
    act(() => {
      result.current.connection.setBaseUrl('https://api.kanka.io/1.0');
    });

    await waitForNextUpdate({ timeout: 3000 });
    expect(result.current.connection.status).toBe('invalid');

    expect(result.current.error).toBeTruthy();
    expect(result.current.error).toBe('Failed to validate connection');
  });

  it('should set status to valid when validateConnection succeeds', async () => {
    (api.validateConnection as jest.Mock).mockResolvedValue('valid');

    const { result, waitForNextUpdate } = renderHook(() =>
      useKankaConnection()
    );

    act(() => {
      result.current.connection.setApiKey('valid-api-key');
    });

    act(() => {
      result.current.connection.setBaseUrl('https://api.kanka.io/1.0');
    });
    await waitForNextUpdate({ timeout: 3000 });

    expect(result.current.error).toBeNull();
    expect(result.current.connection.status).toBe('valid');
  });

  it('should set key and url if they are in constants', async () => {
    // Mock environment variables
    process.env.NEXT_PUBLIC_API_KEY = 'mock-api-key';
    process.env.NEXT_PUBLIC_BASE_URL = 'mock-base-url';

    const { result } = renderHook(() => useKankaConnection());

    await waitFor(() =>
      expect(result.current.connection.apiKey).toBe('mock-api-key')
    );
    expect(result.current.connection.baseUrl).toBe('mock-base-url');
  });
});

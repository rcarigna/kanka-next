import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  KankaDataProvider,
  useKankaContext,
  KankaContext,
} from './KankaContext';
import { useKankaConnection } from '../hooks';
import * as api from '../api';
import '@testing-library/jest-dom';
import { ConnectionType, KankaConnectionType } from '../types';

// Mock useKankaConnection
jest.mock('../hooks/useKankaConnection');
const mockUseKankaConnection =
  useKankaConnection as jest.Mock<KankaConnectionType>;

jest.mock('../api');

describe('KankaDataProvider', () => {
  let mockFetchData: jest.Mock;

  beforeEach(() => {
    mockFetchData = jest.fn();
    jest.spyOn(api, 'fetchEntity').mockImplementation(mockFetchData);
    mockUseKankaConnection.mockReturnValue({
      connection: {
        status: 'valid',
        apiKey: undefined,
        setApiKey: jest.fn(),
        clearApiKey: jest.fn(),
        baseUrl: '',
        setBaseUrl: jest.fn(),
      },
      error: '',
    });
  });

  it('renders children correctly', () => {
    render(
      <KankaDataProvider>
        <div>Test Child</div>
      </KankaDataProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('provides connection and campaigns context values', () => {
    render(
      <KankaDataProvider>
        <KankaContext.Consumer>
          {(context) =>
            context ? (
              <>
                <div>{context.connection.connection.status}</div>
                <div>{context.campaigns?.length}</div>
              </>
            ) : null
          }
        </KankaContext.Consumer>
      </KankaDataProvider>
    );

    expect(screen.getByText('valid')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Initial state is empty array
  });

  it('fetches campaigns when status is "valid" and loading is true', () => {
    const mockConnection: ConnectionType = {
      status: 'valid',
      apiKey: 'some key',
      setApiKey: jest.fn(),
      clearApiKey: jest.fn(),
      baseUrl: 'baseUrl.com',
      setBaseUrl: jest.fn(),
    };
    mockUseKankaConnection.mockReturnValueOnce({
      connection: mockConnection,
      error: '',
    });

    render(
      <KankaDataProvider>
        <div>Loading Campaigns</div>
      </KankaDataProvider>
    );

    expect(mockFetchData).toHaveBeenCalledWith(
      mockConnection.apiKey,
      mockConnection.baseUrl,
      'campaigns'
    );
  });

  it('does not fetch campaigns when status is not "valid"', () => {
    mockUseKankaConnection.mockReturnValueOnce({
      connection: {
        status: 'invalid',
        apiKey: undefined,
        setApiKey: jest.fn(),
        clearApiKey: jest.fn(),
        baseUrl: '',
        setBaseUrl: jest.fn(),
      },
      error: '',
    });

    render(
      <KankaDataProvider>
        <div>No Fetch</div>
      </KankaDataProvider>
    );

    expect(mockFetchData).not.toHaveBeenCalled();
  });

  it('fetches entities using fetchEntityWrapper', async () => {
    const mockConnection: ConnectionType = {
      status: 'valid',
      apiKey: 'some key',
      setApiKey: jest.fn(),
      clearApiKey: jest.fn(),
      baseUrl: 'baseUrl.com',
      setBaseUrl: jest.fn(),
    };
    mockUseKankaConnection.mockReturnValueOnce({
      connection: mockConnection,
      error: '',
    });

    const TestComponent = () => {
      const { fetchEntity } = useKankaContext();
      React.useEffect(() => {
        fetchEntity('characters', jest.fn());
      }, [fetchEntity]);
      return <div>Fetching Entities</div>;
    };

    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        mockConnection.apiKey,
        mockConnection.baseUrl,
        'characters'
      );
    });
  });

  it('logs an error when failing to fetch entities using fetchEntityWrapper', async () => {
    const mockConnection: ConnectionType = {
      status: 'valid',
      apiKey: 'some key',
      setApiKey: jest.fn(),
      clearApiKey: jest.fn(),
      baseUrl: 'baseUrl.com',
      setBaseUrl: jest.fn(),
    };
    mockUseKankaConnection.mockReturnValueOnce({
      connection: mockConnection,
      error: '',
    });

    const TestComponent = () => {
      const { fetchEntity } = useKankaContext();
      React.useEffect(() => {
        fetchEntity('characters', jest.fn());
      }, [fetchEntity]);
      return <div>Fetching Entities</div>;
    };
    const spy = jest.spyOn(console, 'error');
    mockFetchData.mockRejectedValueOnce(new Error('Failed to fetch data'));
    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        mockConnection.apiKey,
        mockConnection.baseUrl,
        'characters'
      );
    });
    expect(spy).toHaveBeenCalled();
  });

  it('handles error when initial loading of campaign options fails', async () => {
    const mockConnection: ConnectionType = {
      status: 'valid',
      apiKey: 'valid-api-key',
      setApiKey: jest.fn(),
      clearApiKey: jest.fn(),
      baseUrl: 'baseUrl.com',
      setBaseUrl: jest.fn(),
    };

    mockUseKankaConnection.mockReturnValueOnce({
      connection: mockConnection,
      error: '',
    });

    const TestComponent = () => {
      const { campaigns } = useKankaContext();
      return (
        <div>
          {campaigns?.length === 0 ? 'No campaigns' : 'Campaigns loaded'}
        </div>
      );
    };

    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockFetchData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        'valid-api-key',
        'baseUrl.com',
        'campaigns'
      );
    });

    expect(spy).toHaveBeenCalledWith(
      'Error fetching campaigns:',
      expect.any(Error)
    );
    spy.mockRestore();
  });
});

describe('useKankaContext', () => {
  it('throws an error if used outside KankaDataProvider', () => {
    const TestComponent = () => {
      useKankaContext();
      return <div />;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useKankaContext must be used within a DataProvider'
    );
  });

  it('returns context values when used within KankaDataProvider', () => {
    const TestComponent = () => {
      const { connection, campaigns } = useKankaContext();
      return (
        <>
          <div>{connection.connection.status}</div>
          <div>{campaigns?.length}</div>
        </>
      );
    };

    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    expect(screen.getByText('valid')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Default campaigns length
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  KankaDataProvider,
  useKankaContext,
  KankaContext,
} from './KankaContext';
import { useKankaConnection } from './useKankaConnection';
import '@testing-library/jest-dom';
import { KankaConnectionType } from './types';

// Mock useKankaConnection
jest.mock('./useKankaConnection');
const mockUseKankaConnection =
  useKankaConnection as jest.Mock<KankaConnectionType>;

describe('KankaDataProvider', () => {
  let mockFetchData: jest.Mock;

  beforeEach(() => {
    mockFetchData = jest.fn();

    mockUseKankaConnection.mockReturnValue({
      connection: {
        status: 'valid',
        apiKey: undefined,
        setApiKey: jest.fn(),
        clearApiKey: jest.fn(),
        baseUrl: '',
      },
      fetchData: mockFetchData,
      loading: true,
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
    render(
      <KankaDataProvider>
        <div>Loading Campaigns</div>
      </KankaDataProvider>
    );

    expect(mockFetchData).toHaveBeenCalledWith({
      endpoint: '/campaigns',
      save: expect.any(Function),
    });
  });

  it('does not fetch campaigns when status is not "valid"', () => {
    mockUseKankaConnection.mockReturnValueOnce({
      connection: {
        status: 'invalid',
        apiKey: undefined,
        setApiKey: jest.fn(),
        clearApiKey: jest.fn(),
        baseUrl: '',
      },
      fetchData: mockFetchData,
      loading: true,
      error: '',
    });

    render(
      <KankaDataProvider>
        <div>No Fetch</div>
      </KankaDataProvider>
    );

    expect(mockFetchData).not.toHaveBeenCalled();
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

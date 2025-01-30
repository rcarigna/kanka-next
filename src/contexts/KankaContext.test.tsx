import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  KankaContext,
  KankaDataProvider,
  useKankaContext,
} from './KankaContext';
import { useKankaConnection } from '../hooks';
import { fetchEntitiesForType, fetchEntityMap } from '../api';
import { mockContext } from '@/__mocks__/constants';

jest.mock('../hooks');
jest.mock('../api');

const mockUseKankaConnection = useKankaConnection as jest.Mock;
const mockFetchEntitiesForType = fetchEntitiesForType as jest.Mock;
const mockFetchEntityMap = fetchEntityMap as jest.Mock;

const TestComponent = () => {
  const context = useKankaContext();
  return (
    <div>
      <div data-testid='status'>{context.connection.connection.status}</div>
      <div data-testid='campaigns'>{JSON.stringify(context.campaigns)}</div>
      <div data-testid='entityTypes'>{JSON.stringify(context.entityTypes)}</div>
      <div data-testid='entityLinks'>
        {context.entityTypes.map((type) => (
          <a key={type.id} href={`${type.path}`} />
        ))}
      </div>
    </div>
  );
};

describe('KankaContext', () => {
  let mockFetchEntityMapReturnValue: ReturnType<typeof fetchEntityMap>;
  beforeEach(() => {
    mockFetchEntityMapReturnValue = [];
    mockUseKankaConnection.mockReturnValue({
      connection: {
        status: 'valid',
        apiKey: 'test-api-key',
        baseUrl: 'test-base-url',
      },
    });
    mockFetchEntitiesForType.mockResolvedValue([]);
    mockFetchEntityMap.mockReturnValue(mockFetchEntityMapReturnValue);
  });

  it('provides the correct context values', async () => {
    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('valid');
      expect(screen.getByTestId('campaigns')).toHaveTextContent('[]');
      expect(screen.getByTestId('entityTypes')).toHaveTextContent('[]');
    });
  });

  it('fetches campaigns on load', async () => {
    const campaigns = [{ id: 1, name: 'Campaign 1' }];
    mockFetchEntitiesForType.mockResolvedValueOnce(campaigns);

    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('campaigns')).toHaveTextContent(
        JSON.stringify(campaigns)
      );
    });
    expect(mockFetchEntityMap).not.toHaveBeenCalled();
  });

  it('fetches entity types when a campaign is selected', async () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <TestComponent />
      </KankaContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('entityTypes')).toHaveTextContent(
        JSON.stringify(mockContext.entityTypes)
      );
      expect(screen.getByTestId('entityLinks').children).toHaveLength(
        mockContext.entityTypes.length
      );
    });
  });

  it('fetches entity types when selectedCampaign changes', async () => {
    const { rerender } = render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          entityTypes: [],
          selectedCampaign: undefined,
        }}
      >
        <TestComponent />
      </KankaContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('entityTypes')).toHaveTextContent('[]');
    });

    rerender(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <TestComponent />
      </KankaContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('entityTypes')).toHaveTextContent(
        JSON.stringify(mockContext.entityTypes)
      );
    });
  });
});

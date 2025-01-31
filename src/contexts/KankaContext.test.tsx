import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KankaDataProvider, useKankaContext } from './KankaContext';
import {
  useKankaConnection,
  useCampaigns,
  useEntities,
  useFetchEntity,
} from '../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks');
jest.mock('../api');

const mockUseKankaConnection = useKankaConnection as jest.Mock;
const mockUseCampaigns = useCampaigns as jest.Mock;
const mockUseEntities = useEntities as jest.Mock;
const mockUseFetchEntity = useFetchEntity as jest.Mock;

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
      <button
        data-testid='change-campaign'
        onClick={() => context.setSelectedCampaign(1)}
      >
        Change Campaign
      </button>
    </div>
  );
};

describe('KankaContext', () => {
  beforeEach(() => {
    mockUseKankaConnection.mockReturnValue({
      connection: {
        status: 'valid',
        apiKey: 'test-api-key',
        baseUrl: 'test-base-url',
      },
    });
    mockUseCampaigns.mockReturnValue({ campaigns: [] });
    mockUseEntities.mockReturnValue({ entities: [] });
    mockUseFetchEntity.mockReturnValue({ fetchEntity: jest.fn() });
  });

  it('throws an error when not used within a DataProvider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useKankaContext must be used within a DataProvider');
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
    mockUseCampaigns.mockImplementation(() => ({ campaigns }));

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
  });

  it('fetches entity types when selectedCampaign changes', async () => {
    const entities = [{ id: 1, path: '/entity/1' }];
    mockUseEntities.mockReturnValue({ entities });

    render(
      <KankaDataProvider>
        <TestComponent />
      </KankaDataProvider>
    );

    await userEvent.click(screen.getByTestId('change-campaign'));

    await waitFor(() => {
      expect(screen.getByTestId('entityTypes')).toHaveTextContent(
        JSON.stringify(entities)
      );
    });
  });
});

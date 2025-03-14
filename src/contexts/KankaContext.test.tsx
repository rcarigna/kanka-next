import React from 'react';
import useSWR from 'swr';

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KankaDataProvider, useKankaContext } from './KankaContext';
import { RouterProvider } from './RouterContext';
import { useKankaConnection } from '../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('../hooks');
jest.mock('../api');

jest.mock('swr');

const mockUseKankaConnection = useKankaConnection as jest.Mock;
const mockUseSWR = (useSWR as jest.Mock).mockReturnValue({
  data: undefined,
  error: undefined,
});
// const mockUseFetchEntity = useFetchEntity as jest.Mock;

const TestComponent = () => {
  const context = useKankaContext();
  return (
    <div>
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
  const mockCampaigns = [{ id: 1, name: 'Campaign 1' }];
  const mockEntityTypes = [
    { id: 1, code: 'character', sitePath: '/campaigns/1/character' },
  ];
  beforeEach(() => {
    mockUseKankaConnection.mockReturnValue({
      connection: {
        status: 'valid',
        apiKey: 'test-api-key',
        baseUrl: 'test-base-url',
      },
    });
    mockUseSWR.mockImplementation((key) => {
      if (key === 'campaigns') {
        return { data: mockCampaigns, error: undefined };
      } else if (Array.isArray(key) && key[0] === 'entityTypes') {
        return { data: mockEntityTypes, error: undefined };
      }
      return { data: undefined, error: undefined };
    });
    // mockUseFetchEntity.mockReturnValue({ fetchEntity: jest.fn() });
  });

  it('throws an error when not used within a DataProvider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useKankaContext must be used within a DataProvider');
  });

  it('provides the correct context values', async () => {
    render(
      <RouterProvider>
        <KankaDataProvider>
          <TestComponent />
        </KankaDataProvider>
      </RouterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('campaigns')).toHaveTextContent(
        JSON.stringify(mockCampaigns)
      );
      expect(screen.getByTestId('entityTypes')).toHaveTextContent('[]');
    });
  });

  it('fetches campaigns on load', async () => {
    render(
      <RouterProvider>
        <KankaDataProvider>
          <TestComponent />
        </KankaDataProvider>
      </RouterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('campaigns')).toHaveTextContent(
        JSON.stringify(mockCampaigns)
      );
    });
  });

  it('fetches entity types when selectedCampaign changes', async () => {
    render(
      <RouterProvider>
        <KankaDataProvider>
          <TestComponent />
        </KankaDataProvider>
      </RouterProvider>
    );

    await userEvent.click(screen.getByTestId('change-campaign'));

    await waitFor(() => {
      expect(screen.getByTestId('entityTypes')).toHaveTextContent(
        JSON.stringify(mockEntityTypes)
      );
    });
  });
});

import React from 'react';
import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';
import { render, screen, waitFor } from '@testing-library/react';
import Entities from './page';
import * as api from '../../../../api';

jest.mock('../../../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../../../../api', () => ({
  fetchEntitiesForType: jest.fn().mockResolvedValue([]),
  fetchEntityMap: jest.fn().mockResolvedValue([]),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('Entities Page', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fetchEntityMap').mockReturnValue([
      {
        id: 1,
        code: 'character',
        path: '',
      },
      {
        id: 2,
        code: 'location',
        path: '',
      },
      {
        id: 3,
        code: 'item',
        path: '',
      },
    ]);
    jest
      .spyOn(api, 'fetchEntitiesForType')
      .mockResolvedValue([{ id: 1, name: 'Character 1', entity_id: 1 }]);
  });

  it('renders PageWrapper and EntitiesPanel', async () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: 1,
          selectedEntityType: 'character',
          entities: [{ id: 1, name: 'Character 1', entity_id: 1 }],
          entitiesError: null,
        }}
      >
        <Entities />
      </KankaContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('entities-panel')).toBeInTheDocument();
    });
  });
  it('renders loading when entityType is not defined', async () => {
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <Entities />
      </KankaContext.Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('No entity-type found')).toBeInTheDocument()
    );
  });
});

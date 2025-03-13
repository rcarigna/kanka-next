import React from 'react';
import { useParams } from 'next/navigation';
import useSwr from 'swr';
import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';
import { render, screen, waitFor } from '@testing-library/react';
import Entities from './page';
import * as api from '../../../../api';

jest.mock('swr');
const mockUseSWR = (useSwr as jest.Mock).mockReturnValue({
  data: undefined,
  error: undefined,
});
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
}));

describe('Entities Page', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ 'entity-type': 'character' });
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
    (useParams as jest.Mock).mockReturnValue({ 'entity-type': 'character' });

    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <Entities />
      </KankaContext.Provider>
    );

    expect(mockUseSWR).toHaveBeenCalledWith(
      { entityType: 'character', selectedCampaign: 1 },
      expect.any(Function)
    );
  });
  it('renders loading when entityType is not defined', async () => {
    (useParams as jest.Mock).mockReturnValue({ 'entity-type': undefined });
    render(<Entities />);
    await waitFor(() =>
      expect(screen.getByText('No entity-type found')).toBeInTheDocument()
    );
  });
});

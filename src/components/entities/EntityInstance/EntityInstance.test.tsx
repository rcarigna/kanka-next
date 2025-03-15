import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../../../api';
import { EntityInstance } from './EntityInstance';
import { CharacterEntity } from '../EntityPanel/types';
import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';
import useSWR from 'swr';

jest.mock('swr');
const mockUseSWR = (useSWR as jest.Mock).mockReturnValue({
  data: undefined,
  error: undefined,
});
jest.mock('../../../api');

describe('EntityInstance', () => {
  const character: CharacterEntity = {
    id: 1,
    name: 'Character 1',
    entity_id: 1,
    tags: ['tag1', 'tag2'],
  };
  let mockFetchData: jest.Mock;
  beforeEach(() => {
    mockFetchData = jest.fn();
    mockFetchData.mockResolvedValue(character);

    jest.spyOn(api, 'getEntityByID').mockImplementation(mockFetchData);
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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the entity details', async () => {
    (mockUseSWR as jest.Mock).mockReturnValueOnce({
      data: character,
      error: undefined,
    });
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityInstance entityType='character' id={character.id} />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    });
  });

  it('should handle invalid or non-existent entity IDs', async () => {
    (mockUseSWR as jest.Mock).mockReturnValueOnce({
      data: undefined,
      error: new Error('Not found'),
    });
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityInstance entityType='character' id={character.id} />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
  it('should handle not being passed an entity type', async () => {
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityInstance entityType='' id={character.id} />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(screen.getByText('Invalid entity type')).toBeInTheDocument();
    });
  });
  it('should handle not being passed a character ID', async () => {
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        {/*  @ts-expect-error - testing invalid input */}
        <EntityInstance entityType='character' />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(screen.getByText('Invalid entity ID')).toBeInTheDocument();
    });
  });
  it('should handle unknown entity types', async () => {
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityInstance entityType='invalid-type' id={character.id} />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(
        screen.getByText('Invalid entity type: invalid-type')
      ).toBeInTheDocument();
    });
  });
  it('should handle when no entities of that id exist', async () => {
    (api.getEntityByID as jest.Mock).mockResolvedValueOnce(undefined);
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityInstance entityType='character' id={character.id} />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(
        screen.getByText('No entities with id 1 of type character available')
      ).toBeInTheDocument();
    });
  });

  it('renders correctly when there is no selected campaign and it is done loading', async () => {
    (mockFetchData as jest.Mock).mockImplementation(() => {
      return Promise.resolve(undefined);
    });
    render(
      <KankaContext.Provider
        value={{ ...mockContext, selectedCampaign: undefined }}
      >
        <EntityInstance entityType='character' id={1} />
      </KankaContext.Provider>
    );

    await waitFor(() =>
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    );
    await waitFor(() => {
      expect(screen.getByText('No campaign selected')).toBeInTheDocument();
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { EntityPanel } from './EntityPanel';
import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';
import { CharacterEntity } from './types';
import useSWR from 'swr';

jest.mock('../../../api');
jest.mock('swr');
const mockUseSWR = (useSWR as jest.Mock).mockReturnValue({
  data: undefined,
  error: undefined,
});
const mockCampaigns = [{ id: 1, name: 'Campaign 1' }];
const mockEntityTypes = [{ id: 1, code: 'character' }];

describe('EntityPanel', () => {
  const characterMocks: CharacterEntity[] = [
    {
      id: 1,
      name: 'Character 1',
      entity_id: 1,
      tags: ['tag1', 'tag2'],
    },
    {
      id: 2,
      name: 'Character 2',
      entity_id: 1,
      tags: ['tag3', 'tag4'],
    },
  ];
  beforeEach(() => {
    mockUseSWR.mockImplementation((key) => {
      console.log(`in mockUseSWR: ${key}`);
      if (key === 'campaigns') {
        return { data: mockCampaigns, error: undefined };
      } else if (Array.isArray(key) && key[0] === 'entityTypes') {
        return { data: mockEntityTypes, error: undefined };
      } else if (Array.isArray(key) && key[2] === 'character') {
        return { data: characterMocks, error: undefined };
      }
      return { data: undefined, error: undefined };
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render a list of all entities of the given type', async () => {
    // Assert that the entity list is displayed correctly.
    // Assert that each entity links to the correct route (e.g., /character/1, /character/2).
    render(
      <KankaContext.Provider value={{ ...mockContext, selectedCampaign: 1 }}>
        <EntityPanel entityType='character' />
      </KankaContext.Provider>
    );
    expect(mockUseSWR).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      characterMocks.forEach((character) => {
        expect(screen.getByText(character.name)).toBeInTheDocument();

        const link = screen.getByRole('link', { name: character.name });
        expect(link).toHaveAttribute('href', `/character/${character.id}`);
      });
    });
  });

  it('should display a fallback message if no entities exist for the type', async () => {
    (useSWR as jest.Mock).mockReturnValueOnce({
      data: [],
      error: undefined,
    });
    render(
      <KankaContext.Provider value={mockContext}>
        <EntityPanel entityType='character' />
      </KankaContext.Provider>
    );
    expect(
      screen.getByText('No entities of type character available')
    ).toBeInTheDocument();
  });

  it('should handle invalid or unknown entity types', () => {
    // Mock the API to return a 404 or similar error for an invalid type.
    // Assert that an error or "Page not found" message is displayed.
    render(
      <KankaContext.Provider value={mockContext}>
        <EntityPanel entityType='invalid-type' />
      </KankaContext.Provider>
    );
    expect(
      screen.getByText(`Invalid entity type: invalid-type`)
    ).toBeInTheDocument();
  });

  it('should handle not being given an entity type', () => {
    // Assert that an error message is displayed if no entity type is provided.
    render(
      <KankaContext.Provider value={mockContext}>
        <EntityPanel entityType='' />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Invalid entity type')).toBeInTheDocument();
  });

  it('should display an error message if the API call fails', async () => {
    const error: Error = {
      message: 'Failed to fetch entities',
      name: '',
    };
    (useSWR as jest.Mock).mockReturnValueOnce({
      data: [],
      error: error,
    });
    render(
      <KankaContext.Provider value={mockContext}>
        <EntityPanel entityType='character' />
      </KankaContext.Provider>
    );
    await waitFor(async () => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });
});

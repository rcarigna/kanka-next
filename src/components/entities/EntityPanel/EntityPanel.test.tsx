import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../../../api';
import { EntityPanel } from './EntityPanel';
import { CharacterEntity } from './types';

jest.mock('../../../api');

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
    jest.spyOn(api, 'fetchEntityMap').mockReturnValue([
      { id: 1, code: 'character' },
      { id: 2, code: 'location' },
      { id: 3, code: 'item' },
    ]);
    jest.spyOn(api, 'fetchEntitiesForType').mockResolvedValue(characterMocks);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render a list of all entities of the given type', async () => {
    // Assert that the entity list is displayed correctly.
    // Assert that each entity links to the correct route (e.g., /character/1, /character/2).
    render(<EntityPanel entityType='character' />);
    await waitFor(async () => {
      expect(await screen.findByRole('progressbar')).not.toBeInTheDocument();
    });
    characterMocks.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();

      const link = screen.getByRole('link', { name: character.name });
      expect(link).toHaveAttribute('href', `/character/${character.id}`);
    });
  });

  it('should display a fallback message if no entities exist for the type', async () => {
    // Mock the API to return an empty list for the entity type.
    // Assert that a "No entities available" message is displayed.
    (api.fetchEntitiesForType as jest.Mock).mockResolvedValueOnce([]);
    render(<EntityPanel entityType='character' />);
    await waitFor(async () => {
      expect(await screen.findByRole('progressbar')).not.toBeInTheDocument();
    });
    expect(
      screen.getByText('No entities of type character available')
    ).toBeInTheDocument();
  });

  it('should handle invalid or unknown entity types', () => {
    // Mock the API to return a 404 or similar error for an invalid type.
    // Assert that an error or "Page not found" message is displayed.
    render(<EntityPanel entityType='invalid-type' />);
    expect(
      screen.getByText(`Invalid entity type: invalid-type`)
    ).toBeInTheDocument();
  });

  it('should handle not being given an entity type', () => {
    // Assert that an error message is displayed if no entity type is provided.
    render(<EntityPanel />);
    expect(screen.getByText('Invalid entity type')).toBeInTheDocument();
  });

  it('should display an error message if the API call fails', async () => {
    // Mock the API to reject the promise with an error.
    // Assert that an error message is displayed.
    const error = new Error('Failed to fetch entities');
    (api.fetchEntitiesForType as jest.Mock).mockRejectedValueOnce(error);
    render(<EntityPanel entityType='character' />);
    await waitFor(async () => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });
});

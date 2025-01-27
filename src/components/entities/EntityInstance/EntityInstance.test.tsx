import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../../../api';
import { EntityInstance } from './EntityInstance';
import { CharacterEntity } from '../EntityPanel/types';

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

    jest.spyOn(api, 'fetchEntityById').mockImplementation(mockFetchData);
    jest.spyOn(api, 'fetchEntityMap').mockReturnValue([
      { id: 1, code: 'character' },
      { id: 2, code: 'location' },
      { id: 3, code: 'item' },
    ]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the entity details', async () => {
    render(<EntityInstance entityType='character' id={character.id} />);
    await waitFor(async () => {
      expect(await screen.findByText(character.name)).toBeInTheDocument();
    });
  });

  it('should handle invalid or non-existent entity IDs', async () => {
    (api.fetchEntityById as jest.Mock).mockRejectedValue(
      new Error('Not found')
    );
    render(<EntityInstance entityType='character' id={character.id} />);
    await waitFor(async () => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});

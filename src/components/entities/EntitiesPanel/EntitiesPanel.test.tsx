import { render, screen } from '@testing-library/react';
import * as api from '../../../api/kanka';
import { EntityTypesPanel } from './EntitiesPanel';

jest.mock('../../../api/kanka');

describe('Entity Index Page', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fetchEntityMap').mockReturnValue([
      { id: 1, code: 'character' },
      { id: 2, code: 'location' },
      { id: 3, code: 'item' },
    ]);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render a list of all available entity types', () => {
    render(<EntityTypesPanel />);
    api.fetchEntityMap().forEach((entity) => {
      expect(screen.getByText(entity.code)).toBeInTheDocument();
    });
  });
  it('should display a fallback message if no entity types are available', () => {
    (api.fetchEntityMap as jest.Mock).mockReturnValueOnce([]);
    render(<EntityTypesPanel />);
    expect(screen.getByText('No entity types available')).toBeInTheDocument();
  });
  it.skip('should link to the correct route for each entity type', () => {
    render(<EntityTypesPanel />);
    api.fetchEntityMap().forEach((entity) => {
      const link = screen.getByRole('link', { name: entity.code });
      expect(link).toHaveAttribute('href', `/${entity.code}`);
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Entities from './page';
import * as api from '../../api';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ 'entity-type': 'character' }),
}));

jest.mock('../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../../api', () => ({
  fetchEntitiesForType: jest.fn().mockResolvedValue([]),
  fetchEntityMap: jest.fn().mockResolvedValue([]),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Entities Page', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fetchEntityMap').mockReturnValue([
      { id: 1, code: 'character' },
      { id: 2, code: 'location' },
      { id: 3, code: 'item' },
    ]);
    jest
      .spyOn(api, 'fetchEntitiesForType')
      .mockResolvedValue([{ id: 1, name: 'Character 1', entity_id: 1 }]);
  });
  it('renders PageWrapper and EntitiesPanel', async () => {
    render(<Entities />);
    await waitFor(() =>
      expect(screen.getByTestId('entities-panel')).toBeInTheDocument()
    );
    expect(screen.getByText('Character 1')).toBeInTheDocument();
  });
});

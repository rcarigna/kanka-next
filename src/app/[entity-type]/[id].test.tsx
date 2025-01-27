import { render, screen, waitFor } from '@testing-library/react';
import EntityInstance from './[id]';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('EntityInstance', () => {
  it('should render the entity details', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { entityType: 'character', id: '1' },
    });
    render(<EntityInstance />);
    await waitFor(async () => {
      expect(await screen.findByText('Entity 1')).toBeInTheDocument();
    });
  });
});

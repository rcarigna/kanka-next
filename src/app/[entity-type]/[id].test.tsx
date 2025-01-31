import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import EntityInstance from './[id]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('EntityInstance', () => {
  it('renders EntityInstancePanel with correct props', () => {
    const mockRouter = {
      query: { entityType: 'testEntity', id: '123' },
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<EntityInstance />);

    expect(screen.getByTestId('entity-instance')).toBeInTheDocument();
  });
});

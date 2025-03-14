import { render, screen } from '@testing-library/react';
import EntityInstance from './page';
import { useKankaConnection } from '@/hooks';
import { mockContext } from '@/__mocks__/constants';
import { KankaContext } from '@/contexts';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { entityType: 'testEntity', id: '123' },
    push: jest.fn(),
  }),
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('EntityInstance', () => {
  const kankaConnectionMock = {
    connection: { status: 'valid' },
    error: '',
  };
  it('renders EntityInstancePanel with correct props', () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);

    render(
      <KankaContext.Provider value={mockContext}>
        <EntityInstance />
      </KankaContext.Provider>
    );

    expect(screen.getByTestId('entity-instance')).toBeInTheDocument();
  });
});

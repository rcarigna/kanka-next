import React from 'react';
import { render, screen } from '@testing-library/react';
import Entities from './page';
import { useKankaConnection } from '@/hooks';

import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),

  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Entities Component', () => {
  const kankaConnectionMock = {
    connection: { status: 'valid' },
    error: '',
  };
  it('should render EntitiesPanel component', () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);

    render(
      <KankaContext.Provider value={mockContext}>
        <Entities />
      </KankaContext.Provider>
    );
    const entitiesPanel = screen.getByTestId('entities-panel');
    expect(entitiesPanel).toBeInTheDocument();
  });
});

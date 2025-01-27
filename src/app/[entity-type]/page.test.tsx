import React from 'react';
import { render, screen } from '@testing-library/react';
import Entities from './page';

jest.mock('../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Entities Page', () => {
  it('renders PageWrapper and EntitiesPanel', () => {
    render(<Entities />);
    expect(screen.getByTestId('entities-panel')).toBeInTheDocument();
  });
});

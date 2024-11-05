/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { Content } from '../src/app/components/Content';
import { ConnectionStatus, KankaContextType } from '@/app/contexts/types';
import { KankaContext } from '../src/app/contexts/KankaContext';

describe('Content', () => {
  const props: KankaContextType = {
    status: 'loading',
    error: '',
    fetchData: jest.fn(),
    campaigns: [],
  };
  it('renders a loading page', async () => {
    render(
      <KankaContext.Provider value={props}>
        <Content />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders an error page', async () => {
    render(
      <KankaContext.Provider value={{ ...props, status: 'invalid' }}>
        <Content />
      </KankaContext.Provider>
    );
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
  it('renders an error if no provider is given', () => {
    expect(() => render(<Content />)).toThrow(
      'useKankaContext must be used within a DataProvider'
    );
  });
  it('renders a valid page', async () => {
    render(
      <KankaContext.Provider value={{ ...props, status: 'valid' }}>
        <Content />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
  });
});

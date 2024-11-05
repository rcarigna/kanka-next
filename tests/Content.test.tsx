/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { Content } from '../src/app/components/Content';
import { ConnectionStatus, KankaContextType } from '@/app/contexts/types';
import { KankaContext } from '../src/app/contexts/KankaContext';

describe('Content', () => {
  const props: {
    status: ConnectionStatus;
    error: any;
  } = {
    status: 'loading',
    error: '',
  };
  it('renders a loading page', async () => {
    render(<Content {...props} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders an error page', async () => {
    render(<Content {...{ ...props, status: 'invalid' }} />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
  it('renders an error if no provider is given', () => {
    expect(() =>
      render(<Content {...{ ...props, status: 'valid' }} />)
    ).toThrow('useKankaContext must be used within a DataProvider');
  });
  it('renders a valid page', async () => {
    const providerProps: KankaContextType = {
      status: 'valid',
      error: '',
      fetchData: jest.fn(),
      campaigns: [],
    };
    render(
      <KankaContext.Provider value={providerProps}>
        <Content {...{ ...props, status: 'valid' }} />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
  });
});

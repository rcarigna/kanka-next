import { render, screen } from '@testing-library/react';
import { KankaContextType } from '../src/app/contexts/types';
import { KankaContext } from '../src/app/contexts/KankaContext';
import Home from '../src/app/page';

describe('HomePage', () => {
  const props: KankaContextType = {
    status: 'loading',
    error: '',
    fetchData: jest.fn(),
    campaigns: [],
  };
  it('renders a loading page', async () => {
    render(
      <KankaContext.Provider value={props}>
        <Home />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders an error page', async () => {
    render(
      <KankaContext.Provider value={{ ...props, status: 'invalid' }}>
        <Home />
      </KankaContext.Provider>
    );
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
  it('renders a valid page', async () => {
    render(
      <KankaContext.Provider value={{ ...props, status: 'valid' }}>
        <Home />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
  });
});

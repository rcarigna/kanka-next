import { render, screen } from '@testing-library/react';
import { KankaContextType } from '../types';
import { KankaContext } from '../contexts';
import Home from './page';

describe('HomePage', () => {
  afterEach(() => jest.clearAllMocks());
  const fetchMock = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => {
        return Promise.resolve({
          data: [{ id: 1, name: 'Waterdhavian Webs' }],
        });
      },
    })
  ) as jest.Mock;

  const props: KankaContextType = {
    fetchEntity: fetchMock,
    connection: {
      connection: {
        apiKey: 'someKey',
        setApiKey: (value) => (props.connection.connection.apiKey = value),
        clearApiKey: () => {
          props.connection.connection.apiKey = undefined;
          props.connection.connection.status = 'valid';
        },
        baseUrl: 'someUrl',
        setBaseUrl: jest.fn(),
        status: 'loading',
      },
      error: '',
    },
  };

  it('renders loading', async () => {
    render(
      <KankaContext.Provider value={{ ...props }}>
        <Home />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { Login } from '../src/app/components/Login';
import { KankaContextType, KankaContext } from '../src/app/contexts';
import exp from 'constants';

describe('<Login />', () => {
  const mockFn = jest.fn();
  const props: KankaContextType = {
    connection: {
      connection: {
        apiKey: undefined,
        setApiKey: mockFn,
        clearApiKey: () => {
          props.connection.connection.apiKey = undefined;
          props.connection.connection.status = 'apiKeyMissing';
        },
        baseUrl: 'someUrl',
        status: 'loading',
      },
      loading: false,
      error: '',
      fetchData: jest.fn(),
    },
  };
  it('does stuff', async () => {
    render(
      <KankaContext.Provider value={props}>
        <Login />
      </KankaContext.Provider>
    );
    expect(screen.getByPlaceholderText('Enter API Key')).toBeInTheDocument();
    expect(screen.getByText('Need a personal access token?'));
    expect(screen.getByText('Authenticate')).toBeInTheDocument();
    expect(screen.getByText('Authenticate')).toBeDisabled();
  });
  it('does more stuff', async () => {
    render(
      <KankaContext.Provider value={props}>
        <Login />
      </KankaContext.Provider>
    );
    await userEvent.type(
      screen.getByPlaceholderText('Enter API Key'),
      'someapikey'
    );
    await waitFor(() => expect(screen.getByText('Authenticate')).toBeEnabled());
    await userEvent.click(screen.getByText('Authenticate'));
    expect(mockFn).toHaveBeenCalledWith('someapikey');
  });
});

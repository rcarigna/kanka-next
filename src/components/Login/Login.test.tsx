import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';
import { useKankaConnection } from '@/hooks';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));

describe('<Login />', () => {
  const mockFn = jest.fn();
  const props = {
    connection: {
      apiKey: undefined,
      setApiKey: mockFn,
      clearApiKey: () => {
        props.connection.apiKey = undefined;
        props.connection.status = 'apiKeyMissing';
      },
      baseUrl: 'someUrl',
      status: 'loading',
    },
    loading: false,
    error: '',
    fetchData: jest.fn(),
  };
  it('does stuff', async () => {
    (useKankaConnection as jest.Mock).mockReturnValue(props);
    render(<Login />);
    expect(screen.getByPlaceholderText('Enter API Key')).toBeInTheDocument();
    expect(screen.getByText('Need a personal access token?'));
    expect(screen.getByText('Authenticate')).toBeInTheDocument();
    expect(screen.getByText('Authenticate')).toBeDisabled();
  });
  it('does more stuff', async () => {
    (useKankaConnection as jest.Mock).mockReturnValue(props);
    render(<Login />);
    await userEvent.type(
      screen.getByPlaceholderText('Enter API Key'),
      'someapikey'
    );
    await waitFor(() => expect(screen.getByText('Authenticate')).toBeEnabled());
    await userEvent.click(screen.getByText('Authenticate'));
    expect(mockFn).toHaveBeenCalledWith('someapikey');
  });
});

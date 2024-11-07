import { render, screen, waitFor } from '@testing-library/react';
import {
  KankaContextType,
  validateConnectionType,
  fetchFromEndpointType,
} from './contexts/types';
import { KankaContext } from './contexts/KankaContext';
import {
  validateConnection,
  fetchFromEndpoint,
} from './contexts/useKankaConnection';
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
  const sadFetchMock = jest.fn(() =>
    Promise.resolve({
      ok: false,
    })
  ) as jest.Mock;
  const saddestFetchMock = jest.fn(() =>
    Promise.reject(new Error('Some API error'))
  ) as jest.Mock;
  const props: KankaContextType = {
    connection: {
      connection: {
        apiKey: 'someKey',
        setApiKey: (value) => (props.connection.connection.apiKey = value),
        clearApiKey: () => {
          props.connection.connection.apiKey = undefined;
          props.connection.connection.status = 'valid';
        },
        baseUrl: 'someUrl',
        status: 'loading',
      },
      loading: false,
      error: '',
      fetchData: fetchMock,
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

  it('validates a connection using baseUrl/campaigns', async () => {
    global.fetch = fetchMock;

    const validateConnectionProps: validateConnectionType = {
      apiKey: '<testKey>',
      setError: jest.fn(),
      setStatus: jest.fn(),
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      baseUrl: 'localhost:8080',
    };
    validateConnection(validateConnectionProps);
    expect(fetchMock).toHaveBeenCalledWith(
      `${validateConnectionProps.baseUrl}/campaigns`,
      { headers: validateConnectionProps.commonHeaders }
    );
  });

  it('validates a connection using baseUrl/campaigns', async () => {
    global.fetch = fetchMock;

    const validateConnectionProps: validateConnectionType = {
      // @ts-expect-error: this test is covering the scenario in which there is no key
      apiKey: undefined,
      setError: jest.fn(),
      setStatus: jest.fn(),
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      baseUrl: 'localhost:8080',
    };
    validateConnection(validateConnectionProps);
    expect(validateConnectionProps.setError).toHaveBeenCalledWith(
      `API key is missing`
    );
    expect(validateConnectionProps.setStatus).toHaveBeenCalledWith('invalid');
  });

  it('validates a connection using baseUrl/campaigns and updates status in the happy path', async () => {
    global.fetch = fetchMock;

    const validateConnectionProps: validateConnectionType = {
      apiKey: '<testKey>',
      setError: jest.fn(),
      setStatus: jest.fn(),
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      baseUrl: 'localhost:8080',
    };
    validateConnection(validateConnectionProps);
    waitFor(() =>
      expect(validateConnectionProps.setStatus).toHaveBeenCalledWith('valid')
    );
  });

  it('validates a connection using baseUrl/campaigns and updates status in the sad path', async () => {
    global.fetch = sadFetchMock;

    const validateConnectionProps: validateConnectionType = {
      apiKey: '<testKey>',
      setError: jest.fn(),
      setStatus: jest.fn(),
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      baseUrl: 'localhost:8080',
    };
    validateConnection(validateConnectionProps);
    await waitFor(() =>
      expect(validateConnectionProps.setStatus).toHaveBeenCalledWith('invalid')
    );
    await waitFor(() =>
      expect(validateConnectionProps.setError).toHaveBeenCalledWith(
        `Error fetching from localhost:8080/campaigns.`
      )
    );
  });

  it('handles an error when validating connection', async () => {
    global.fetch = saddestFetchMock;

    const validateConnectionProps: validateConnectionType = {
      apiKey: '<testKey>',
      setError: jest.fn(),
      setStatus: jest.fn(),
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      baseUrl: 'localhost:8080',
    };
    validateConnection(validateConnectionProps);
    await waitFor(() =>
      expect(validateConnectionProps.setStatus).toHaveBeenCalledWith('invalid')
    );
    await waitFor(() =>
      expect(validateConnectionProps.setError).toHaveBeenCalledWith(
        `Failed to validate connection`
      )
    );
  });

  it('returns null for fetch when still validating connection', async () => {
    const setErrorMock = jest.fn();
    const fetchFromEndpointProps: fetchFromEndpointType = {
      status: 'loading',
      endpoint: '/campaigns',
      baseUrl: 'localhost:8080',
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      setError: setErrorMock,
    };
    const result = await fetchFromEndpoint(fetchFromEndpointProps);
    await waitFor(() => expect(result).toBe(null));
  });

  it('fetches from an end point', async () => {
    const setErrorMock = jest.fn();
    global.fetch = fetchMock;
    const fetchFromEndpointProps: fetchFromEndpointType = {
      status: 'valid',
      endpoint: '/campaigns',
      baseUrl: 'localhost:8080',
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      setError: setErrorMock,
    };
    const result = await Promise.resolve(
      fetchFromEndpoint(fetchFromEndpointProps)
    );
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('localhost:8080/campaigns', {
        headers: fetchFromEndpointProps.commonHeaders,
      });
    });
    expect(result).toEqual([{ id: 1, name: 'Waterdhavian Webs' }]);
  });

  it('attempts to fetch from an end point', async () => {
    const setErrorMock = jest.fn();
    global.fetch = sadFetchMock;
    const fetchFromEndpointProps: fetchFromEndpointType = {
      status: 'valid',
      endpoint: '/campaigns',
      baseUrl: 'localhost:8080',
      commonHeaders: {
        Authorization: `Bearer insert api key here`,
        'Content-type': 'application/json',
      },
      setError: setErrorMock,
    };
    const result = await Promise.resolve(
      fetchFromEndpoint(fetchFromEndpointProps)
    );
    await waitFor(() => {
      expect(sadFetchMock).toHaveBeenCalledWith('localhost:8080/campaigns', {
        headers: fetchFromEndpointProps.commonHeaders,
      });
    });
    expect(result).toBeNull();
    expect(fetchFromEndpointProps.setError).toHaveBeenCalledWith(
      `Error fetching data from ${fetchFromEndpointProps.endpoint}`
    );
  });
});

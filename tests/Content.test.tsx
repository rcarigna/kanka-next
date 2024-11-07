import { render, screen } from '@testing-library/react';
import { Content } from '../src/app/components/Content';
import { ConnectionType, KankaContextType } from '@/app/contexts/types';
import { KankaContext } from '../src/app/contexts/KankaContext';

describe('Content', () => {
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
      loading: true,
      error: '',
      fetchData: jest.fn(),
    },
    campaigns: [
      {
        name: 'Waterdhavian Webs',
        id: 206764,
        locale: '',
        entry: '',
        entry_parsed: '',
        image: '',
        image_full: '',
        image_thumb: '',
        visibility: '',
        visibility_id: 0,
        created_at: '',
        updated_at: '',
      },
    ],
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
    const errorConnection: ConnectionType = {
      ...props.connection.connection,
      status: 'invalid',
    };
    const errorProps = {
      ...props,
      connection: { ...props.connection, connection: errorConnection },
    };
    render(
      <KankaContext.Provider value={errorProps}>
        <Content />
      </KankaContext.Provider>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Try again?/)).toBeInTheDocument();
  });
  it('renders an error if no provider is given', () => {
    expect(() => render(<Content />)).toThrow(
      'useKankaContext must be used within a DataProvider'
    );
  });

  it('renders a valid page', async () => {
    const validConnection: ConnectionType = {
      ...props.connection.connection,
      status: 'valid',
    };
    const validProps = {
      ...props,
      connection: { ...props.connection, connection: validConnection },
    };
    render(
      <KankaContext.Provider value={validProps}>
        <Content />
      </KankaContext.Provider>
    );
    if (props.campaigns) {
      expect(screen.getByText(props.campaigns[0].name)).toBeInTheDocument();
    }
  });

  it('renders a login page', async () => {
    const loginConnection: ConnectionType = {
      ...props.connection.connection,
      status: 'apiKeyMissing',
    };
    const loginProps = {
      ...props,
      connection: { ...props.connection, connection: loginConnection },
    };
    render(
      <KankaContext.Provider value={loginProps}>
        <Content />
      </KankaContext.Provider>
    );
    expect(screen.getByLabelText('Please provide API key')).toBeInTheDocument();
  });

  it('renders a valid page even if they do not have any campaigns', async () => {
    const validConnection: ConnectionType = {
      ...props.connection.connection,
      status: 'valid',
    };
    const validProps = {
      ...props,
      campaigns: [],
      connection: { ...props.connection, connection: validConnection },
    };
    render(
      <KankaContext.Provider value={validProps}>
        <Content />
      </KankaContext.Provider>
    );
    expect(
      screen.getByTestId('entity-grid-campaigns-panel')
    ).toBeInTheDocument();
  });

  it('renders a valid page even if they do not have any campaigns', async () => {
    const validConnection: ConnectionType = {
      ...props.connection.connection,
      status: 'valid',
    };
    const validProps = {
      ...props,
      campaigns: undefined,
      connection: { ...props.connection, connection: validConnection },
    };
    render(
      <KankaContext.Provider value={validProps}>
        <Content />
      </KankaContext.Provider>
    );
    expect(
      screen.getByTestId('entity-grid-campaigns-panel')
    ).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { KankaContextType } from '../../contexts/types';
import CampaignDropdown from './CampaignDropdown';
import { KankaContext } from '../../contexts/KankaContext';

describe('CampaignDropdown', () => {
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
        status: 'valid',
      },
      loading: false,
      error: '',
      fetchData: jest.fn(),
    },
  };
  it('renders a dropdown with no data', async () => {
    render(
      <KankaContext.Provider value={props}>
        <CampaignDropdown />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
    await userEvent.click(
      screen.getByLabelText('Select your campaign to begin')
    );
    expect(screen.getByText('No campaigns available')).toBeInTheDocument();
  });
  it('renders a dropdown with an empty array', async () => {
    render(
      <KankaContext.Provider value={{ ...props, campaigns: [] }}>
        <CampaignDropdown />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
    await userEvent.click(
      screen.getByLabelText('Select your campaign to begin')
    );
    expect(screen.getByText('No campaigns available')).toBeInTheDocument();
  });
  it('renders a dropdown with data', async () => {
    const campaigns = [
      {
        id: 1,
        name: 'Waterdhavian Webs',
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
      {
        id: 2,
        name: 'Moonshae',
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
      {
        id: 3,
        name: 'Curse of Strahd',
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
    ];
    render(
      <KankaContext.Provider value={{ ...props, campaigns: campaigns }}>
        <CampaignDropdown />
      </KankaContext.Provider>
    );
    expect(
      screen.getByLabelText('Select your campaign to begin')
    ).toBeInTheDocument();
    await userEvent.click(
      screen.getByLabelText('Select your campaign to begin')
    );
    props.campaigns?.forEach((element) => {
      expect(screen.getByText(element.name)).toBeInTheDocument();
    });
  });
});

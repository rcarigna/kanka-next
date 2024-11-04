import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { KankaContextType } from '../src/app/contexts/types';
import CampaignDropdown from '../src/app/components/CampaignDropdown';
import { KankaContext } from '../src/app/contexts/KankaContext';

describe('CampaignDropdown', () => {
  it('renders a dropdown with no data', async () => {
    const props: KankaContextType = {
      status: 'valid',
      error: '',
      fetchData: jest.fn(),
    };
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
    const props: KankaContextType = {
      status: 'valid',
      error: '',
      campaigns: [],
      fetchData: jest.fn(),
    };
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
  it('renders a dropdown with data', async () => {
    const props: KankaContextType = {
      status: 'valid',
      error: '',
      campaigns: [
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
      ],
      fetchData: jest.fn(),
    };
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
    props.campaigns.forEach((element) => {
      expect(screen.getByText(element.name)).toBeInTheDocument();
    });
  });
});

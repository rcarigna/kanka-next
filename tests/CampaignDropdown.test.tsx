import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { KankaContextType } from '../src/app/contexts/types';
import CampaignDropdown from '../src/app/components/CampaignDropdown';
import { KankaContext } from '../src/app/contexts/KankaContext';

describe('CampaignDropdown', () => {
  it('renders a dropdown with no data', async () => {
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
});

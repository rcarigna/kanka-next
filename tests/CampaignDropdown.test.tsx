import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { KankaContextType } from '../src/app/contexts/types';
import CampaignDropdown from '../src/app/components/CampaignDropdown';
import { KankaContext } from '../src/app/contexts/KankaContext';

it('renders a dropdown with no data', () => {
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
  expect(screen.getByText('No campaigns available')).toBeInTheDocument();
});

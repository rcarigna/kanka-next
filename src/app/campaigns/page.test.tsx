import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Campaigns from './page';
import { useKankaContext } from '../../contexts';

jest.mock('../../contexts', () => ({
  useKankaContext: jest.fn(),
}));

jest.mock('../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../../components/campaigns', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CampaignsPanel: ({ campaigns }: { campaigns: any[] }) => (
    <div>
      CampaignsPanel
      {campaigns.map((campaign, index) => (
        <div key={index}>{campaign.name}</div>
      ))}
    </div>
  ),
}));

describe('Campaigns Page', () => {
  it('renders without crashing', () => {
    (useKankaContext as jest.Mock).mockReturnValue({ campaigns: [] });
    render(<Campaigns />);
    expect(screen.getByText('CampaignsPanel')).toBeInTheDocument();
  });

  it('renders campaigns from context', () => {
    const mockCampaigns = [{ name: 'Campaign 1' }, { name: 'Campaign 2' }];
    (useKankaContext as jest.Mock).mockReturnValue({
      campaigns: mockCampaigns,
    });
    render(<Campaigns />);
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Campaign 2')).toBeInTheDocument();
  });

  it('renders empty campaigns when context is null', () => {
    (useKankaContext as jest.Mock).mockReturnValue({ campaigns: null });
    const { container } = render(<Campaigns />);
    expect(container).toBeEmptyDOMElement();
  });
});

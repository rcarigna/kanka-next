import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignSelect } from './CampaignSelect';
import { useKankaContext } from '../../../contexts';
import { mockContext } from '../../../__mocks__/constants';

jest.mock('../../../contexts', () => ({
  useKankaContext: jest.fn(),
}));

describe('CampaignSelect', () => {
  beforeEach(() => {
    (useKankaContext as jest.Mock).mockReturnValue(mockContext);
  });
  it('renders the Select a Campaign heading', () => {
    (useKankaContext as jest.Mock).mockReturnValue({ campaigns: [] });
    const { getByText } = render(<CampaignSelect />);
    expect(getByText('Select a Campaign')).toBeInTheDocument();
  });

  it('renders the CampaignsPanel with campaigns', () => {
    const mockCampaigns = [
      { id: 1, name: 'Campaign 1' },
      { id: 2, name: 'Campaign 2' },
    ];
    (useKankaContext as jest.Mock).mockReturnValue({
      ...mockContext,
      campaigns: mockCampaigns,
    });
    const { getByText } = render(<CampaignSelect />);
    expect(getByText('Campaign 1')).toBeInTheDocument();
    expect(getByText('Campaign 2')).toBeInTheDocument();
  });

  it('renders the CampaignsPanel with no campaigns', () => {
    (useKankaContext as jest.Mock).mockReturnValue({
      ...mockContext,
      campaigns: [],
    });
    render(<CampaignSelect />);
    expect(screen.getByText('Select a Campaign')).toBeInTheDocument();
  });
});

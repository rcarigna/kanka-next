import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignsPanel } from './CampaignsPanel';
import { mockContext } from '../../../__mocks__/constants';
import { KankaContext } from '../../../contexts';

describe('CampaignsPanel', () => {
  it('renders without crashing', () => {
    render(
      <KankaContext.Provider value={mockContext}>
        <CampaignsPanel />
      </KankaContext.Provider>
    );
    expect(
      screen.getByTestId('entity-grid-campaigns-panel')
    ).toBeInTheDocument();
  });

  it('renders the correct number of campaign previews', () => {
    render(
      <KankaContext.Provider value={mockContext}>
        <CampaignsPanel />
      </KankaContext.Provider>
    );
    const campaignPreviews = screen.getAllByTestId(/^campaign-panel-preview-/);
    expect(campaignPreviews).toHaveLength(mockContext.campaigns.length);
  });

  it('renders campaign previews with correct keys', () => {
    const { getByTestId } = render(
      <KankaContext.Provider value={mockContext}>
        <CampaignsPanel />
      </KankaContext.Provider>
    );
    mockContext.campaigns.forEach((campaign) => {
      expect(
        getByTestId(`campaign-panel-preview-${campaign.id}`)
      ).toBeInTheDocument();
    });
  });

  it('does not render if campaigns are null', () => {
    const { queryByTestId } = render(
      <KankaContext.Provider value={{ ...mockContext, campaigns: null }}>
        <CampaignsPanel />
      </KankaContext.Provider>
    );
    expect(queryByTestId('entity-grid-campaigns-panel')).toBeNull();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignSelected } from './CampaignSelected';
import { KankaContext } from '../../../contexts';

const mockCampaigns = [
  { id: '1', name: 'Campaign 1', entry: '<p>Entry 1</p>' },
  { id: '2', name: 'Campaign 2', entry: '<p>Entry 2</p>' },
];

const renderComponent = (selectedCampaign: string | undefined) => {
  const setSelectedCampaign = jest.fn();
  render(
    <KankaContext.Provider
      value={{
        campaigns: mockCampaigns,
        selectedCampaign,
        setSelectedCampaign,
      }}
    >
      <CampaignSelected />
    </KankaContext.Provider>
  );
};

describe('CampaignSelected', () => {
  it('renders campaign details when a campaign is selected', () => {
    renderComponent('1');
    expect(screen.getByText('Campaign 1')).toBeInTheDocument();
    expect(screen.getByText('Entry 1')).toBeInTheDocument();
  });

  it('renders "No description available." when campaign entry is empty', () => {
    const campaigns = [{ id: '3', name: 'Campaign 3', entry: '' }];
    render(
      <KankaContext.Provider
        value={{
          campaigns,
          selectedCampaign: '3',
          setSelectedCampaign: jest.fn(),
        }}
      >
        <CampaignSelected />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Campaign 3')).toBeInTheDocument();
    expect(screen.getByText('No description available.')).toBeInTheDocument();
  });

  it('calls setSelectedCampaign with undefined when "Back to Campaigns" button is clicked', () => {
    const setSelectedCampaign = jest.fn();
    render(
      <KankaContext.Provider
        value={{
          campaigns: mockCampaigns,
          selectedCampaign: '1',
          setSelectedCampaign,
        }}
      >
        <CampaignSelected />
      </KankaContext.Provider>
    );
    fireEvent.click(screen.getByText('Back to Campaigns'));
    expect(setSelectedCampaign).toHaveBeenCalledWith(undefined);
  });

  it('does not render campaign details when no campaign is selected', () => {
    renderComponent(undefined);
    expect(screen.queryByText('Campaign 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Entry 1')).not.toBeInTheDocument();
  });
});

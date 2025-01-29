import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CampaignSelected, NO_ENTRY_TEXT } from './CampaignSelected';
import { KankaContext } from '../../../contexts';
import { mockContext } from '../../../__mocks__/constants';
import { CampaignType } from '../../../types';

const renderComponent = (selectedCampaign: number | undefined) => {
  const setSelectedCampaign = jest.fn();
  render(
    <KankaContext.Provider
      value={{
        ...mockContext,
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
    renderComponent(206764);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(
      screen.getByText(
        `A band of strangers brought together by a chance encounter with a troll in the Yawning Portal began a mad romp through the wards of Waterdeep. The group uncovered plot after villainous plot, involving some of the city\u2019s most influential, and infamous, figures.`
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/<p>/)).not.toBeInTheDocument();
  });

  it('renders "No description available." when campaign entry is empty', () => {
    const tempCampaigns: CampaignType[] = mockContext.campaigns.map((c) => ({
      ...c,
      entry: '',
    }));
    console.log(`tempCampaigns: ${JSON.stringify(tempCampaigns)}`);
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          campaigns: tempCampaigns,
          selectedCampaign: 206764,
        }}
      >
        <CampaignSelected />
      </KankaContext.Provider>
    );
    expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
    expect(screen.getByText(NO_ENTRY_TEXT)).toBeInTheDocument();
  });

  it('calls setSelectedCampaign with undefined when "Back to Campaigns" button is clicked', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: 206764,
        }}
      >
        <CampaignSelected />
      </KankaContext.Provider>
    );
    fireEvent.click(screen.getByText('Back to Campaigns'));
    expect(mockContext.setSelectedCampaign).toHaveBeenCalledWith(undefined);
  });

  it('does not render campaign details when no campaign is selected', () => {
    renderComponent(undefined);
    expect(screen.queryByText('Campaign 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Entry 1')).not.toBeInTheDocument();
  });

  it('does not render campaign details when selected campaign is not found', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: 1,
        }}
      >
        <CampaignSelected />
      </KankaContext.Provider>
    );
    expect(screen.getByText('Back to Campaigns')).toBeInTheDocument();
    expect(
      screen.getByText('Problem with campaign selected')
    ).toBeInTheDocument();
  });
});

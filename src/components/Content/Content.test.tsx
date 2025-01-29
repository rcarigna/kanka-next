import React from 'react';
import { render, screen } from '@testing-library/react';
import { Content } from './Content';
import { KankaContext } from '../../contexts';
import { mockContext } from '../../__mocks__/constants';

describe('Content Component', () => {
  it('should render CampaignSelected when a campaign is selected', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <Content />
      </KankaContext.Provider>
    );

    expect(screen.queryByText(/select a campaign/)).not.toBeInTheDocument();
  });

  it('should render CampaignSelect when no campaign is selected', () => {
    const { getByText } = render(
      <KankaContext.Provider value={mockContext}>
        <Content />
      </KankaContext.Provider>
    );

    expect(getByText(/select a campaign/i)).toBeInTheDocument();
  });
});

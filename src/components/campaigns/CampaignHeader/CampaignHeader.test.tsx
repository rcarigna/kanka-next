import { render, screen } from '@testing-library/react';
import { mockContext } from '@/__mocks__/constants';
import { KankaContext } from '@/contexts';
import { CampaignHeader } from './CampaignHeader';

describe('CampaignHeader', () => {
  it('shoulder render the campaign name if a campaign is selected', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <CampaignHeader />
      </KankaContext.Provider>
    );
    expect(screen.getByTestId('campaign-header')).toBeInTheDocument();
    expect(screen.getByText(mockContext.campaigns[0].name)).toBeInTheDocument();
  });
  it('should render null if no campaign is selected', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
        }}
      >
        <CampaignHeader />
      </KankaContext.Provider>
    );
    expect(screen.queryByText(mockContext.campaigns[0].name)).toBeNull();
  });
});

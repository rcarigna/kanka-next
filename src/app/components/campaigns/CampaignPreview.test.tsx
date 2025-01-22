import { render, screen } from '@testing-library/react';
import { campaigns } from '../../__mocks__/constants';
import { CampaignPreview } from './CampaignPreview';

describe('CampaignPreview', () => {
  it('renders a summary', async () => {
    render(
      <CampaignPreview
        campaign={campaigns[0]}
        baseURL={'https://app.kanka.io'}
      />
    );
    expect(screen.getByText(campaigns[0].name)).toBeInTheDocument();
    expect(screen.getByTestId('OpenInNewIcon').closest('a')).toHaveAttribute(
      'href',
      'https://app.kanka.io/w/206764'
    );
  });
});

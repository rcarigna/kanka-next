import { render, screen } from '@testing-library/react';
import { campaigns } from '../../../__mocks__/constants';
import { CampaignPreview } from './CampaignPreview';
import { KankaContext } from '../../../contexts';
import { KankaContextType } from '../../../types';
import userEvent from '@testing-library/user-event';
import { useKankaConnection } from '@/hooks';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));

describe('CampaignPreview', () => {
  const mockFn = jest.fn();
  const kankaConnectionMock = {
    connection: {
      apiKey: undefined,
      setApiKey: mockFn,
      clearApiKey: () => {
        kankaConnectionMock.connection.apiKey = undefined;
        kankaConnectionMock.connection.status = 'apiKeyMissing';
      },
      baseUrl: 'someUrl',
      setBaseUrl: mockFn,
      status: 'loading',
    },
    error: '',
  };
  const props: KankaContextType = {
    campaigns: [],
    fetchEntity: jest.fn(),
    setSelectedCampaign: jest.fn(),
    entityTypes: [],
  };
  it('renders a summary', async () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);
    render(
      <KankaContext.Provider value={props}>
        <CampaignPreview campaign={campaigns[0]} />
      </KankaContext.Provider>
    );
    expect(screen.getByText(campaigns[0].name)).toBeInTheDocument();
    expect(screen.getByTestId('OpenInNewIcon').closest('a')).toHaveAttribute(
      'href',
      'someUrl/w/206764'
    );
  });
  it('selects a campaign on click', async () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);
    render(
      <KankaContext.Provider value={props}>
        <CampaignPreview campaign={campaigns[0]} />
      </KankaContext.Provider>
    );
    expect(screen.getByText(campaigns[0].name)).toBeInTheDocument();
    await userEvent.click(screen.getByText(campaigns[0].name));
    expect(props.setSelectedCampaign).toHaveBeenCalledWith(206764);
  });
});

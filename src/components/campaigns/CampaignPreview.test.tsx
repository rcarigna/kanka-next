import { render, screen } from '@testing-library/react';
import { campaigns } from '../../__mocks__/constants';
import { CampaignPreview } from './CampaignPreview';
import { KankaContext } from '../../contexts';
import { KankaContextType } from '../../types';

describe('CampaignPreview', () => {
  const mockFn = jest.fn();
  const props: KankaContextType = {
    fetchEntity: jest.fn(),
    connection: {
      connection: {
        apiKey: undefined,
        setApiKey: mockFn,
        clearApiKey: () => {
          props.connection.connection.apiKey = undefined;
          props.connection.connection.status = 'apiKeyMissing';
        },
        baseUrl: 'someUrl',
        setBaseUrl: mockFn,
        status: 'loading',
      },
      error: '',
    },
  };
  it('renders a summary', async () => {
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
});

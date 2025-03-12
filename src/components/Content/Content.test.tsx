import React from 'react';
import { render, screen } from '@testing-library/react';
import { Content } from './Content';
import { KankaContext } from '../../contexts';
import { mockContext } from '../../__mocks__/constants';
import { useKankaConnection } from '@/hooks';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));

describe('Content Component', () => {
  const kankaConnectionMock = {
    connection: { status: 'valid' },
    error: '',
  };
  it('should render CampaignSelected when a campaign is selected', () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);

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
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);
    const { getByText } = render(
      <KankaContext.Provider value={mockContext}>
        <Content />
      </KankaContext.Provider>
    );

    expect(getByText(/select a campaign/i)).toBeInTheDocument();
  });
});

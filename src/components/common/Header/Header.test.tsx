import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';
import { mockContext } from '@/__mocks__/constants';
import { KankaContext } from '@/contexts';

describe('Header component', () => {
  it('renders Kanka logo', () => {
    render(
      <KankaContext.Provider value={mockContext}>
        <Header />
      </KankaContext.Provider>
    );
    const kankaLogo = screen.getByAltText('Kanka logo');
    expect(kankaLogo).toBeInTheDocument();
    expect(kankaLogo).toHaveAttribute('src', '/kanka.svg');
    expect(kankaLogo).toHaveAttribute('width', '180');
    expect(kankaLogo).toHaveAttribute('height', '180');
  });

  it('renders Next.js logo', () => {
    render(
      <KankaContext.Provider value={mockContext}>
        <Header />
      </KankaContext.Provider>
    );
    const nextLogo = screen.getByAltText('Next.js logo');
    expect(nextLogo).toBeInTheDocument();
    expect(nextLogo).toHaveAttribute('src', '/next.svg');
    expect(nextLogo).toHaveAttribute('width', '180');
    expect(nextLogo).toHaveAttribute('height', '38');
  });

  it('renders CampaignHeader component', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <Header />
      </KankaContext.Provider>
    );
    expect(screen.getByTestId('campaign-header')).toBeInTheDocument();

    const campaignHeader = screen.getByText(mockContext.campaigns[0].name);
    expect(campaignHeader).toBeInTheDocument();
  });

  it('does not render the campaign name if no campaign is selected', () => {
    render(
      <KankaContext.Provider value={mockContext}>
        <Header />
      </KankaContext.Provider>
    );
    expect(screen.queryByTestId('campaign-header')).toBeNull();
  });
});

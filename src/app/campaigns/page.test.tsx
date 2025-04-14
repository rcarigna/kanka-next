import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Campaigns from './page';

jest.mock('../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('../../components/campaigns', () => ({
  CampaignsPanel: () => <div>CampaignsPanel</div>,
}));

describe('Campaigns Page', () => {
  it('renders the CampaignsPanel inside the PageWrapper', () => {
    render(<Campaigns />);
    expect(screen.getByText('CampaignsPanel')).toBeInTheDocument();
  });
});

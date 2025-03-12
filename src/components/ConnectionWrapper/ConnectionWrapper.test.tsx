import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConnectionWrapper } from './ConnectionWrapper';
import { useKankaConnection } from '@/hooks';

jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));

describe('ConnectionWrapper', () => {
  it('renders loading state', () => {
    (useKankaConnection as jest.Mock).mockReturnValue({
      connection: { status: 'loading' },
      error: null,
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders invalid state', () => {
    (useKankaConnection as jest.Mock).mockReturnValue({
      connection: { status: 'invalid', clearApiKey: jest.fn() },
      error: 'Invalid API Key',
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByText('Invalid API Key')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Try again\?/i })
    ).toBeInTheDocument();
  });

  it('renders apiKeyMissing state', () => {
    (useKankaConnection as jest.Mock).mockReturnValue({
      connection: { status: 'apiKeyMissing' },
      error: null,
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByText('Authenticate')).toBeInTheDocument();
  });

  it('renders valid state', () => {
    (useKankaConnection as jest.Mock).mockReturnValue({
      connection: { status: 'valid' },
      error: null,
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});

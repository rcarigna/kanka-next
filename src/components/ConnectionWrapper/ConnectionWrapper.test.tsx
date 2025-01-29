import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConnectionWrapper } from './ConnectionWrapper';
import { useKankaContext } from '../../contexts';

jest.mock('../../contexts', () => ({
  useKankaContext: jest.fn(),
}));

describe('ConnectionWrapper', () => {
  it('renders loading state', () => {
    (useKankaContext as jest.Mock).mockReturnValue({
      connection: {
        connection: { status: 'loading' },
        error: null,
      },
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
    (useKankaContext as jest.Mock).mockReturnValue({
      connection: {
        connection: { status: 'invalid', clearApiKey: jest.fn() },
        error: 'Invalid API Key',
      },
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
    (useKankaContext as jest.Mock).mockReturnValue({
      connection: {
        connection: { status: 'apiKeyMissing' },
        error: null,
      },
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByText('Authenticate')).toBeInTheDocument();
  });

  it('renders valid state', () => {
    (useKankaContext as jest.Mock).mockReturnValue({
      connection: {
        connection: { status: 'valid' },
        error: null,
      },
    });

    render(
      <ConnectionWrapper>
        <div>Child Component</div>
      </ConnectionWrapper>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});

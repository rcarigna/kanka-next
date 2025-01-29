import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';
import { ErrorBoundary } from 'react-error-boundary';

jest.mock('../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Content: () => <div>Content Component</div>,
}));

describe('Home Page', () => {
  test('renders PageWrapper and Content components', () => {
    render(<Home />);
    expect(screen.getByText('Content Component')).toBeInTheDocument();
  });

  test('displays fallback UI on error', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary fallback={<div>something went wrong</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('something went wrong')).toBeInTheDocument();
  });
});

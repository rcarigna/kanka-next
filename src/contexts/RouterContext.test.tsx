import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, useRouterContext } from './RouterContext';
import { usePathname, useParams } from 'next/navigation';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

describe('RouterContext', () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: jest.fn() });
    mockUsePathname.mockReturnValue('/test-path');
    mockUseParams.mockReturnValue({
      campaignId: '123',
      entityType: 'type',
      entityId: '456',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const context = useRouterContext();
    return (
      <div>
        <span data-testid='campaignId'>{context.campaignId}</span>
        <span data-testid='entityType'>{context.entityType}</span>
        <span data-testid='entityId'>{context.entityId}</span>
        <span data-testid='pathname'>{context.pathname}</span>
      </div>
    );
  };

  it('provides the correct context values', () => {
    render(
      <RouterProvider>
        <TestComponent />
      </RouterProvider>
    );

    expect(screen.getByTestId('campaignId').textContent).toBe('123');
    expect(screen.getByTestId('entityType').textContent).toBe('type');
    expect(screen.getByTestId('entityId').textContent).toBe('456');
    expect(screen.getByTestId('pathname').textContent).toBe('/test-path');
  });

  it('throws an error if useRouterContext is used outside of RouterProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useRouterContext must be used within a RouterProvider'
    );

    consoleError.mockRestore();
  });
});

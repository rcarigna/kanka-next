import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Error } from './Error';

describe('Error component', () => {
  it('renders the error message', () => {
    const errorMessage = 'This is an error message';
    render(<Error error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('has the correct severity', () => {
    const errorMessage = 'This is an error message';
    render(<Error error={errorMessage} />);
    const alertElement = screen
      .getByText(errorMessage)
      .closest('.MuiAlert-root');
    expect(alertElement).toHaveClass('MuiAlert-standardError');
  });
});

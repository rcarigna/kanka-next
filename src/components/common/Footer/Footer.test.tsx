import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('should render the Kanka link', () => {
    render(<Footer />);
    const kankaLink = screen.getByText('Go to kanka.io →');
    expect(kankaLink).toBeInTheDocument();
    expect(kankaLink.closest('a')).toHaveAttribute('href', 'https://kanka.io/');
  });

  it('should render the Next.js link', () => {
    render(<Footer />);
    const nextjsLink = screen.getByText('Go to nextjs.org →');
    expect(nextjsLink).toBeInTheDocument();
    expect(nextjsLink.closest('a')).toHaveAttribute(
      'href',
      'https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
    );
  });
});

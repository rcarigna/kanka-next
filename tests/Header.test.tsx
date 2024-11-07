import { render, screen } from '@testing-library/react';
import { Header } from '../src/app/components';

describe('Header', () => {
  it('renders a loading page', async () => {
    render(<Header />);
    expect(screen.getByAltText('Kanka logo')).toBeInTheDocument();
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument();
  });
});

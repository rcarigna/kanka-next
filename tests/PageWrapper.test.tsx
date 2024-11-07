import { render, screen } from '@testing-library/react';
import { PageWrapper } from '../src/app/components';

describe('PageWrapper', () => {
  it('renders the icons', async () => {
    render(<PageWrapper>Yup</PageWrapper>);
    expect(screen.getByText('Yup')).toBeInTheDocument();
    expect(screen.getByAltText('Kanka logo')).toBeInTheDocument();
  });
});

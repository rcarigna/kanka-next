import { render, screen } from '@testing-library/react';
import { PageWrapper } from './PageWrapper';
import { useKankaConnection } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/hooks', () => ({
  useKankaConnection: jest.fn(),
}));
describe('PageWrapper', () => {
  const kankaConnectionMock = {
    connection: { status: 'valid', campaignId: '123' },
    error: '',
  };
  it('renders the icons', async () => {
    (useKankaConnection as jest.Mock).mockReturnValue(kankaConnectionMock);
    render(<PageWrapper>Yup</PageWrapper>);
    expect(screen.getByText('Yup')).toBeInTheDocument();
    expect(screen.getByAltText('Kanka logo')).toBeInTheDocument();
  });
});

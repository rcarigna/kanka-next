import { render, screen, waitFor } from '@testing-library/react';
import Entity from './[id]';

jest.mock('../../components', () => ({
  PageWrapper: ({ children }: { children: React.ReactNode }) => (
    <div> {children} </div>
  ),
}));
describe('Entity', () => {
  it('should render the entity details', async () => {
    render(<Entity />);
    await waitFor(async () => {
      expect(await screen.findByText('Entity goes here')).toBeInTheDocument();
    });
  });
});

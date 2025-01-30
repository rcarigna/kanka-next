import { render, screen } from '@testing-library/react';
import { Toolbar } from './Toolbar';
import { KankaContext } from '@/contexts';
import { mockContext } from '@/__mocks__/constants';

describe('Toolbar', () => {
  it('should render null if entityTypes or selectedCampaign is not defined', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: undefined,
        }}
      >
        <Toolbar />
      </KankaContext.Provider>
    );
    expect(screen.queryByRole('link')).toBeNull();
  });
  it('should render a list of entities with links to their respective pages', () => {
    const { getByText } = render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <Toolbar />
      </KankaContext.Provider>
    );
    mockContext.entityTypes.forEach((entity) => {
      expect(getByText(entity.code)).toBeInTheDocument();
      expect(
        screen.getByTestId(`toolbar-link-entity-${entity.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`toolbar-link-entity-${entity.id}`)
      ).toHaveAttribute('href', entity.path || '#');
    });
  });

  it('should render the correct number of entity links', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <Toolbar />
      </KankaContext.Provider>
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockContext.entityTypes.length);
  });

  it('should render buttons inside each link', () => {
    render(
      <KankaContext.Provider
        value={{
          ...mockContext,
          selectedCampaign: mockContext.campaigns[0].id,
        }}
      >
        <Toolbar />
      </KankaContext.Provider>
    );
    mockContext.entityTypes.forEach((entity) => {
      const link = screen.getByTestId(`toolbar-link-entity-${entity.id}`);
      expect(link).toContainElement(screen.getByText(entity.code));
    });
  });
});
// });

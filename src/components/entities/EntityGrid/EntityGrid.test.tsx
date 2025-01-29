import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EntityGrid } from './EntityGrid';
import { EntityGridProps } from '../../../types';

describe('EntityGrid', () => {
  const entities = ['Entity 1', 'Entity 2', 'Entity 3'];
  const dataTestId = 'entity-grid';

  const renderComponent = (props: Partial<EntityGridProps> = {}) => {
    const defaultProps: EntityGridProps = {
      entities,
      dataTestId,
      ...props,
    };
    return render(<EntityGrid {...defaultProps} />);
  };

  test('renders without crashing', () => {
    renderComponent();
    const gridElement = screen.getByTestId(dataTestId);
    expect(gridElement).toBeInTheDocument();
  });

  test('renders the correct number of entities', () => {
    renderComponent();
    const entityElements = screen.getAllByText(/Entity \d/);
    expect(entityElements).toHaveLength(entities.length);
  });

  test('applies hover effect on entity cards', () => {
    renderComponent();
    const entityElements = screen.getAllByText(/Entity \d/);

    entityElements.forEach((entityElement) => {
      entityElement.dispatchEvent(
        new MouseEvent('mouseover', { bubbles: true })
      );
      expect(entityElement).toHaveStyle('transform: scale(1.05)');
      entityElement.dispatchEvent(
        new MouseEvent('mouseout', { bubbles: true })
      );
      expect(entityElement).toHaveStyle('transform: scale(1)');
    });
  });
});

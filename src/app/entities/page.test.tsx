import React from 'react';
import { render, screen } from '@testing-library/react';
import Entities from './page';

describe('Entities Component', () => {
  it('should render EntitiesPanel component', () => {
    render(<Entities />);
    const entitiesPanel = screen.getByTestId('entities-panel');
    expect(entitiesPanel).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import PaginationArrows from './pagination-arrows';

describe('PaginationArrows', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaginationArrows />);
    expect(baseElement).toBeTruthy();
  });
});

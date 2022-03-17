import React from 'react';
import { render } from '@testing-library/react';

import PriceList from './price-list';

describe('PriceList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PriceList />);
    expect(baseElement).toBeTruthy();
  });
});

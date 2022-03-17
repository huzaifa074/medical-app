import React from 'react';
import { render } from '@testing-library/react';

import ListingButton from './listing-button';

describe('ListingButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListingButton />);
    expect(baseElement).toBeTruthy();
  });
});

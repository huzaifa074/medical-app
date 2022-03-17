import React from 'react';
import { render } from '@testing-library/react';

import Locations from './locations';

describe('Locations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Locations />);
    expect(baseElement).toBeTruthy();
  });
});

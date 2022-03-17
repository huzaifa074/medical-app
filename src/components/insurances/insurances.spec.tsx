import React from 'react';
import { render } from '@testing-library/react';

import Insurances from './insurances';

describe('Insurances', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Insurances />);
    expect(baseElement).toBeTruthy();
  });
});

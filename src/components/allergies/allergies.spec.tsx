import React from 'react';
import { render } from '@testing-library/react';

import Allergies from './allergies';

describe('Allergies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Allergies />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import Vaccinations from './vaccinations';

describe('Vaccinations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Vaccinations />);
    expect(baseElement).toBeTruthy();
  });
});

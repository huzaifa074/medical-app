import React from 'react';
import { render } from '@testing-library/react';

import Consultations from './consultations';

describe('Consultations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Consultations />);
    expect(baseElement).toBeTruthy();
  });
});

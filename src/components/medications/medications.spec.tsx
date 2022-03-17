import React from 'react';
import { render } from '@testing-library/react';

import Medications from './medications';

describe('Medications', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Medications />);
    expect(baseElement).toBeTruthy();
  });
});

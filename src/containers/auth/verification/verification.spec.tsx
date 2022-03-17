import React from 'react';
import { render } from '@testing-library/react';

import Verification from './verification';

describe('Verification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Verification />);
    expect(baseElement).toBeTruthy();
  });
});

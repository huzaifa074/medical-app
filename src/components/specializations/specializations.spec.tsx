import React from 'react';
import { render } from '@testing-library/react';

import Specializations from './specializations';

describe('Specializations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Specializations />);
    expect(baseElement).toBeTruthy();
  });
});

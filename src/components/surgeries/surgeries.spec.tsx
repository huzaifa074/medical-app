import React from 'react';
import { render } from '@testing-library/react';

import Surgeries from './surgeries';

describe('Surgeries', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Surgeries />);
    expect(baseElement).toBeTruthy();
  });
});

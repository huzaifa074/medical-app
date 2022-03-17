import React from 'react';
import { render } from '@testing-library/react';

import Qualifications from './qualifications';

describe('Qualifications', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Qualifications />);
    expect(baseElement).toBeTruthy();
  });
});

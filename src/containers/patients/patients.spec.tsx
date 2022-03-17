import React from 'react';
import { render } from '@testing-library/react';

import Patients from './patients';

describe('Patients', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Patients />);
    expect(baseElement).toBeTruthy();
  });
});

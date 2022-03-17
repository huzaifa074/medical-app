import React from 'react';
import { render } from '@testing-library/react';

import Appointments from './appointments';

describe('Appointments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Appointments />);
    expect(baseElement).toBeTruthy();
  });
});

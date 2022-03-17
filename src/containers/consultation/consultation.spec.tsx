import React from 'react';
import { render } from '@testing-library/react';

import Consultation from './consultation';

describe('Consultation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Consultation />);
    expect(baseElement).toBeTruthy();
  });
});

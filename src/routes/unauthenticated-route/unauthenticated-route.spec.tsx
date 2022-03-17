import React from 'react';
import { render } from '@testing-library/react';

import UnauthenticatedRoute from './unauthenticated-route';

describe('UnauthenticatedRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UnauthenticatedRoute />);
    expect(baseElement).toBeTruthy();
  });
});

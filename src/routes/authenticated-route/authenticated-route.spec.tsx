import React from 'react';
import { render } from '@testing-library/react';

import AuthenticatedRoute from './authenticated-route';

describe('AuthenticatedRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthenticatedRoute />);
    expect(baseElement).toBeTruthy();
  });
});

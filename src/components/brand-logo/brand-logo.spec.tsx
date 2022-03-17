import React from 'react';
import { render } from '@testing-library/react';

import BrandLogo from './brand-logo';

describe('BrandLogo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BrandLogo />);
    expect(baseElement).toBeTruthy();
  });
});

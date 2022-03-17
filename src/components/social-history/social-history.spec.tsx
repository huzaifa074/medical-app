import React from 'react';
import { render } from '@testing-library/react';

import SocialHistory from './social-history';

describe('SocialHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocialHistory />);
    expect(baseElement).toBeTruthy();
  });
});

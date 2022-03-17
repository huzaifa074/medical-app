import React from 'react';
import { render } from '@testing-library/react';

import Biography from './biography';

describe('Biography', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Biography />);
    expect(baseElement).toBeTruthy();
  });
});

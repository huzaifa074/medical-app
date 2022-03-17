import React from 'react';
import { render } from '@testing-library/react';

import AboutMe from './about-me';

describe('AboutMe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutMe />);
    expect(baseElement).toBeTruthy();
  });
});

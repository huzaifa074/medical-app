import React from 'react';
import { render } from '@testing-library/react';

import MainMenu from './main-menu';

describe('MainMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainMenu />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import LoaderButton from './loader-button';

describe('LoaderButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoaderButton />);
    expect(baseElement).toBeTruthy();
  });
});

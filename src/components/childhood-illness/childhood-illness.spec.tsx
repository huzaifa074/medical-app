import React from 'react';
import { render } from '@testing-library/react';

import ChildhoodIllness from './childhood-illness';

describe('ChildhoodIllness', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChildhoodIllness />);
    expect(baseElement).toBeTruthy();
  });
});

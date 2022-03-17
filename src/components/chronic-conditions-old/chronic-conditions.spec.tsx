import React from 'react';
import { render } from '@testing-library/react';

import ChronicConditions from './chronic-conditions';

describe('ChronicConditions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChronicConditions />);
    expect(baseElement).toBeTruthy();
  });
});

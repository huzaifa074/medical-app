import React from 'react';
import { render } from '@testing-library/react';

import FamilyHistory from './family-history';

describe('FamilyHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FamilyHistory />);
    expect(baseElement).toBeTruthy();
  });
});

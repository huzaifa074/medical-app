import React from 'react';
import { render } from '@testing-library/react';

import AvailabilityCard from './availability-card';

describe('AvailabilityCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AvailabilityCard />);
    expect(baseElement).toBeTruthy();
  });
});

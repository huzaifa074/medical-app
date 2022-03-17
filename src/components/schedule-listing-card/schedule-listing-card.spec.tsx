import React from 'react';
import { render } from '@testing-library/react';

import ScheduleListingCard from './schedule-listing-card';

describe('ScheduleListingCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScheduleListingCard />);
    expect(baseElement).toBeTruthy();
  });
});

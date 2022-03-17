import React from 'react';
import { render } from '@testing-library/react';

import ScheduleAccordion from './schedule-accordion';

describe('ScheduleAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScheduleAccordion />);
    expect(baseElement).toBeTruthy();
  });
});

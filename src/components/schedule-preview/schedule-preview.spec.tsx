import React from 'react';
import { render } from '@testing-library/react';

import SchedulePreview from './schedule-preview';

describe('SchedulePreview', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SchedulePreview />);
    expect(baseElement).toBeTruthy();
  });
});

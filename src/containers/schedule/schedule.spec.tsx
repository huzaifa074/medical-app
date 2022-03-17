import React from 'react';
import { render } from '@testing-library/react';

import Schedule from './schedule';

describe('Schedule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Schedule
      formik={{}}
      isLoading={false}
      locationId=""
      handleSlotIntervalChange={() => ({})}
    />
    );
    expect(baseElement).toBeTruthy();
  });
});

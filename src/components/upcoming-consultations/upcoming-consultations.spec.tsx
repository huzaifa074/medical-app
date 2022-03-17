import React from 'react';
import { render } from '@testing-library/react';

import UpcomingConsultations from './upcoming-consultations';

describe('UpcomingConsultations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpcomingConsultations />);
    expect(baseElement).toBeTruthy();
  });
});

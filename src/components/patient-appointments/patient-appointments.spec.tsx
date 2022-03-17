import React from 'react';
import { render } from '@testing-library/react';

import PatientAppointments from './patient-appointments';

describe('PatientAppointments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientAppointments />);
    expect(baseElement).toBeTruthy();
  });
});

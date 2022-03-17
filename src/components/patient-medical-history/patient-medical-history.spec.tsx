import React from 'react';
import { render } from '@testing-library/react';

import PatientMedicalHistory from './patient-medical-history';

describe('PatientMedicalHistory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientMedicalHistory />);
    expect(baseElement).toBeTruthy();
  });
});

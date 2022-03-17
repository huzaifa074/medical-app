import React from 'react';
import { render } from '@testing-library/react';

import PatientProfileCard from './patient-profile-card';

describe('PatientProfileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientProfileCard />);
    expect(baseElement).toBeTruthy();
  });
});

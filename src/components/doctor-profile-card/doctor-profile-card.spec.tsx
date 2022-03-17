import React from 'react';
import { render } from '@testing-library/react';

import DoctorProfileCard from './doctor-profile-card';

describe('DoctorProfileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoctorProfileCard />);
    expect(baseElement).toBeTruthy();
  });
});

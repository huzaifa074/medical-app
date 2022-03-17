import React from 'react';
import { render } from '@testing-library/react';

import DoctorProfile from './doctor-profile';

describe('DoctorProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoctorProfile />);
    expect(baseElement).toBeTruthy();
  });
});

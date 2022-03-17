import React from 'react';
import { render } from '@testing-library/react';

import DoctorProfileAvatar from './doctor-profile-avatar';

describe('DoctorProfileAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoctorProfileAvatar />);
    expect(baseElement).toBeTruthy();
  });
});

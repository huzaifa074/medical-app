import React from 'react';
import { render } from '@testing-library/react';

import DoctorPersonalInformation from './doctor-personal-information';

describe('DoctorPersonalInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DoctorPersonalInformation />);
    expect(baseElement).toBeTruthy();
  });
});

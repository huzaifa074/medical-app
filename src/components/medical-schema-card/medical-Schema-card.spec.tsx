import React from 'react';
import { render } from '@testing-library/react';

import PatientProfileCard from './medical-schema-card';

describe('PatientProfileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientProfileCard />);
    expect(baseElement).toBeTruthy();
  });
});

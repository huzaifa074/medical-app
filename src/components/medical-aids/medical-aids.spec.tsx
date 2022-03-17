import React from 'react';
import { render } from '@testing-library/react';

import MedicalAids from './medical-aids';

describe('MedicalAids', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MedicalAids />);
    expect(baseElement).toBeTruthy();
  });
});

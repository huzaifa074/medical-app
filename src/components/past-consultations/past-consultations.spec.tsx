import React from 'react';
import { render } from '@testing-library/react';

import PastConsultations from './past-consultations';

describe('PastConsultations', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PastConsultations />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import UpsertPatient from './upsert-patient';

describe('UpsertPatient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpsertPatient />);
    expect(baseElement).toBeTruthy();
  });
});

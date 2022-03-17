import React from 'react';
import { render } from '@testing-library/react';

import UpsertAppointment from './upsert-appointment';

describe('UpsertAppointment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpsertAppointment />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import PrescriptionListingTable from './prescription-listing-table';

describe('PrescriptionListingTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrescriptionListingTable />);
    expect(baseElement).toBeTruthy();
  });
});

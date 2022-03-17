import React from 'react';
import { render } from '@testing-library/react';

import QualificationListingTable from './qualification-listing-table';

describe('QualificationListingTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QualificationListingTable />);
    expect(baseElement).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import ScriptRequests from './script-requests';

describe('ScriptRequests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScriptRequests />);
    expect(baseElement).toBeTruthy();
  });
});

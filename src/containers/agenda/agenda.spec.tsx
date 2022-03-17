import React from 'react';
import { render } from '@testing-library/react';

import Agenda from './agenda';

describe('Agenda', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Agenda />);
    expect(baseElement).toBeTruthy();
  });
});

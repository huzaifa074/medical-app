import React from 'react';
import { render } from '@testing-library/react';

import { ProfileSetting } from './profile-setting';

describe('ProfileSetting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileSetting />);
    expect(baseElement).toBeTruthy();
  });
});

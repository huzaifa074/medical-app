import React from 'react';
import { render } from '@testing-library/react';

import { InputFile } from './input-file';

describe('InputFile', () => {
  it('should render successfully', () => {
    const onFileUpload = (file) => { console.log(file); };
    const { baseElement } = render(<InputFile onFileUpload={onFileUpload} />);
    expect(baseElement).toBeTruthy();
  });
});

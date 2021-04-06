import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import App from '../pages/index.js';

// very simple starter test
describe('sign in and out dropdown', () => {
  // test and it are used interchangably
  it('should render the sign in and out dropdown', () => {
    // basic test using the title attribute to query
    const {queryByTitle} = render(<App />);
    const dropdown = queryByTitle('Sign Out');
    expect(dropdown).toBeTruthy();
  });
});

/*
testing context: https://testing-library.com/docs/example-react-context/
*/

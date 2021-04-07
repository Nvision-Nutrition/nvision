import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import SignUp from 'signUp.jsx';

// xdescribe('', () => {
//   it('', () => {

//   });
// });

describe('signup test', () => {
  const renderComponent = () => {
    // this wrapper argument wraps the NvisionNavbar component in the
    // GlobalStateProvider context.
    return render(<SignUp/>);
  };

  it('should render the form', () => {
    renderComponent();
    const screen = screen.getByLabelText('Signup')
    expect(screen).toBeTruthy();
  });
});
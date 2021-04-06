import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as React from 'react';
import {GlobalStateProvider} from 'globalState.js';
import NvisionNavbar from 'nvisionNavbar.jsx';

describe.only('Nvision Nabar testing suite', () => {
  const renderComponent = () => {
    // this wrapper argument wraps the NvisionNavbar component in the
    // GlobalStateProvider context.
    return render(<NvisionNavbar/>, {wrapper: GlobalStateProvider});
  };

  it('should render the logo', () => {
    const {queryByAltText} = renderComponent();
    const logo = queryByAltText('nVision logo');
    expect(logo).toBeTruthy();
  });

  it('should render a dark mode button', () => {
    const {queryByLabelText} = renderComponent();
    const darkMode = queryByLabelText('dark-mode-toggle');
    expect(darkMode).toBeTruthy();
  });

  it('should render the text "Sign Out" ', () => {
    const {queryByText} = renderComponent();
    const signOut = queryByText('Sign Out');
    expect(signOut).toBeTruthy();
  });

  it('toggles dark mode button on click', () => {
    const {queryByLabelText} = renderComponent();
    const darkMode = queryByLabelText('dark-mode-toggle');

    expect(darkMode).toBeTruthy();
    expect(darkMode).toHaveClass('btn-outline-dark');

    userEvent.click(darkMode);
    expect(darkMode).toHaveClass('btn-outline-light');

    userEvent.click(darkMode);
    expect(darkMode).toHaveClass('btn-outline-dark');
  });
});


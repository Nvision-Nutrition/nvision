import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {GlobalStateProvider} from 'globalState.js';
import * as React from 'react';
import axios from 'axios';
import DailyTracker from 'dailyTracker.jsx';
import InsertModals from 'InsertModals.jsx';

xdescribe('calorie input button', () => {
  const renderTracker = () => {
    const tracker = render(<DailyTracker user={'emma'}/>,
        {wrapper: GlobalStateProvider});
    return tracker;
  };
  it('should render', () => {
    const {queryByTitle} = renderTracker();
    const calBtn = queryByTitle('calorie-btn');
    expect(calBtn).toBeTruthy();
  });

  it('clicking the button toggles the modal', () => {
    renderTracker();
    const button = screen.queryByTitle('calorie-btn');
    fireEvent.click(button);
    const recordBtn = screen.getByText('Record it!');
    expect(recordBtn).toBeInTheDocument();
  });
});

/*
Insert Modal

describe('calorie, water, and weight modals', () => {
  const renderModal = () => {
    return render(<InsertModals />, {wrapper: GlobalStateProvider});
  };


  it('should render submit button', () => {
    const {queryByText} = renderModal();
    const {debug} = renderModal();
    const btn = screen.queryByText('Record it!');
    console.log('btn!!! ', btn);
    debug();
    expect(btn).toBeTruthy();
  });
});

*/

/*
tests for insert modals:
1. onChange select dropdown updates value displyed
2. onChange numeric input is altered
3. onChange date input is altered
4. axios req sent to db on click of record button
5. alert message if input is not valid
*/

import {render, screen} from '@testing-library/react';
import {GlobalStateProvider} from 'globalState.js';
import '@testing-library/jest-dom';
import * as React from 'react';
import InsertModals from 'InsertModals.jsx';

/*
These tests will need to migrate to dailyTracker due to the fact that
buttons must be clicked in order for modal to render.

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
tests for modals:
1. onChange select dropdown updates value displyed
2. onChange numeric input is altered
3. onChange date input is altered
4. axios req sent to db on click of record button
5. alert message if input is not valid
*/

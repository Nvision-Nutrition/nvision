import {render, fireEvent, screen} from '@testing-library/react';
import {GlobalStateProvider} from 'globalState.js';
import '@testing-library/jest-dom';
import * as React from 'react';
import InsertModals from 'InsertModals.jsx';

<<<<<<< HEAD
=======
xdescribe('', () => {
  it('', () => {
>>>>>>> 615591e79f8dca342231a5f83c00e729a5514aeb

describe('calorie, water, and weight modals', () => {
  const renderModal = () => {
    return render(<InsertModals />, {wrapper: GlobalStateProvider});
  };


  it('should render submit button', () => {
    // const {queryByText} = renderModal();
    const {debug} = renderModal();
    const btn = screen.queryByText('Record it!');
    console.log('btn!!! ', btn);
    debug();
    expect(btn).toBeTruthy();
  });
});

/*
tests for modals:
1. onChange select dropdown updates value displyed
2. onChange numeric input is altered
3. onChange date input is altered
4. axios req sent to db on click of record button
5. alert message if input is not valid
*/

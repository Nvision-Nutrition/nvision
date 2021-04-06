import {render, fireEvent, screen} from '@testing-library/react';
import {GlobalStateProvider} from 'globalState.js';
import '@testing-library/jest-dom';
import * as React from 'react';
import InsertModals from 'InsertModals.jsx';

describe('caloric/water input', () => {
  it('should render', () => {
    const {queryByTitle} = render(
        <GlobalStateProvider>
          <InsertModals />
        </GlobalStateProvider>);
    const numericInput = queryByTitle('amount-input');
    expect(numericInput).toBeTruthy();
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

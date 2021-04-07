import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {GlobalStateProvider} from 'globalState.js';
import * as React from 'react';
import DailyTracker from 'dailyTracker.jsx';

describe('calorie input button', () => {
  const renderTracker = () => {
    return render(<DailyTracker />, {wrapper: GlobalStateProvider});
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
    expect(screen.getByText('Record it!')).toBeInTheDocument();
  });
});

import {render, fireEvent, cleanup, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import DailyTracker from 'dailyTracker.jsx';

afterEach(cleanup);

xdescribe('calorie input button', () => {
  it('should render', () => {
    const {queryByTitle} = render(<DailyTracker />);
    const calBtn = queryByTitle('calorie-btn');
    expect(calBtn).toBeTruthy();
  });

  it('clicking the button toggles the modal', () => {
    render(<DailyTracker />);
    const button = screen.queryByTitle('calorie-btn');
    fireEvent.click(button);
    expect(screen.getByText('Record it!')).toBeInTheDocument();
    fireEvent.click(button);
  });
});

import {render, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import DailyTracker from 'dailyTracker.jsx';

afterEach(cleanup);

describe('calorie input button', () => {
  it('should render', () => {
    const {queryByTitle} = render(<DailyTracker />);
    const calBtn = queryByTitle('calorie-btn');
    expect(calBtn).toBeTruthy();
  });
  it('should render calorie modal on click', async () => {
    const fetchMock = jest.spyOn(window,
        'fetch').mockImplementation((req) => req);
    const {getByText} = render(<DailyTracker />);
    fireEvent.click(getByText('Add Calories'));
    await waitForElement(() =>
      expect(getByText('Record it!')).toBeInTheDocument(),
    );
    // reset mock
    fetchMock.restoreAllMocks();
  });
});

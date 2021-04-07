import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {GlobalStateProvider} from 'globalState.js';
import * as React from 'react';
import CalorieTracker from 'calorieTracker.jsx';

describe('calorie input button', () => {
  const renderTracker = () => {
    return render(<CalorieTracker />, {wrapper: GlobalStateProvider});
  };

  it('should render a progress bar', () => {
    const {getByRole} = renderTracker();
    const progressBar = getByRole('progressbar');
    expect(progressBar).toBeTruthy();
  });
});

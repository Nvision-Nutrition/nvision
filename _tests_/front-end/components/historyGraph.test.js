import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as React from 'react';
import {GlobalStateProvider} from 'globalState.js';
import HistoryGraph from 'historyGraph.jsx';


describe('Nvision HistoryGraph testing suite', () => {
  const renderComponent = () => {
    return render(<HistoryGraph/>, {wrapper: GlobalStateProvider});
  };

  it('should render Water by default', () => {
    // const {queryByText} = renderComponent();
    render(<HistoryGraph/>, {wrapper: GlobalStateProvider});
    const aboutAnchorNode = screen.getByText(/water/i);
    expect(aboutAnchorNode).toBeTruthy();
  });


  it('toggles chartSwitch', () => {
    const {queryByLabelText} = renderComponent();
    const switchChart = queryByLabelText('switch-graph');

    let switcher = screen.getByText(/water/i);
    expect(switcher).toBeTruthy();

    userEvent.click(switchChart);
    switcher = screen.getByText(/weight/i);
    expect(switcher).toBeTruthy();

    userEvent.click(switchChart);
    switcher = screen.getByText(/calories/i);
    expect(switcher).toBeTruthy();
  });
});


import React from 'react';
import {ResponsiveBar} from '@nivo/bar';

import styles from '../styles/Home.module.css';

const HistoryGraph = () => {
  const goalValue = 3000;
  const keyValue = 'Calories'

  const data = [
    {
      'dow': 'Sun',
      [keyValue]: 3053,
    },
    {
      'dow': 'Mon',
      [keyValue]: 3003,
    },
    {
      'dow': 'Tue',
      [keyValue]: 2758,
    },
    {
      'dow': 'Wed',
      [keyValue]: 2893,
    },
    {
      'dow': 'Thu',
      [keyValue]: 4208,
    },
    {
      'dow': 'Fri',
      [keyValue]: 3256,
    },
    {
      'dow': 'Sat',
      [keyValue]: 2784,
    },
  ];

  const config = {
    keys: [
      `${keyValue}`,
    ],
    margin: {
      'top': 50,
      'right': 60,
      'bottom': 50,
      'left': 60,
    },
    defs: [
      {
        'id': 'dots',
        'type': 'patternDots',
        'background': 'inherit',
        'color': '#38bcb2',
        'size': 4,
        'padding': 1,
        'stagger': true,
      },
      {
        'id': 'lines',
        'type': 'patternLines',
        'background': 'inherit',
        'color': '#eed312',
        'rotation': -45,
        'lineWidth': 6,
        'spacing': 10,
      },
    ],
    fill: [
    ],
    axisBottom: {
      'tickSize': 5,
      'tickPadding': 5,
      'tickRotation': 0,
      'legend': 'Day of Week',
      'legendPosition': 'middle',
      'legendOffset': 32,
    },
    axisLeft: {
      'tickSize': 5,
      'tickPadding': 5,
      'tickRotation': 0,
      'legend': `${keyValue}`,
      'legendPosition': 'middle',
      'legendOffset': -40,
    },
    legends: [
      {
        'dataFrom': 'keys',
        'effects': [
          {
            'on': 'hover',
            'style': {
              'itemOpacity': 1,
            },
          },
        ],
      },
    ],
  };


  return (
    <>
      <div className={`${styles.card} history-graph`}>
        <p className={`${styles.description} subtitle`}>{`Last 7-Days`}</p>
        <div className="chart">
          <ResponsiveBar
            data={data}
            keys={config.keys}
            indexBy="dow"
            margin={config.margin}
            padding={0.3}
            colors={{scheme: 'category10'}}
            colorBy="id"
            defs={config.defs}
            fill={config.fill}
            borderColor="inherit:darker(1.6)"
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            markers={[
              {
                  axis: 'y',
                  value: goalValue,
                  lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
                  legend: `Target ${goalValue}`,
                  legendOrientation: 'vertical',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default HistoryGraph;

import React from 'react';
import {ResponsiveBar} from '@nivo/bar';

import styles from '../styles/Home.module.css';

const HistoryGraph = () => {
  const data = [
    {
      'dow': 'Sun',
      'calories': 104,
    },
    {
      'dow': 'Mon',
      'calories': 10,
    },
    {
      'dow': 'Tue',
      'calories': 35,
    },
    {
      'dow': 'Wed',
      'calories': 44,
    },
    {
      'dow': 'Thu',
      'calories': 55,
    },
    {
      'dow': 'Fri',
      'calories': 96,
    },
    {
      'dow': 'Sat',
      'calories': 48,
    },
  ];

  const config = {
    keys: [
      'calories',
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
      'legend': 'Calories',
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
            colors={{ scheme: 'category10' }}
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
          />
        </div>
      </div>
    </>
  );
};

export default HistoryGraph;

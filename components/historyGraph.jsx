import React, {useState} from 'react';
import {ResponsiveBar} from '@nivo/bar';
import sevenDayFetch from '../db/dummyData/dummyData.js';
import styles from '../styles/Home.module.css';
import {Button} from 'react-bootstrap';

const HistoryGraph = () => {
  // Macro Number 0 = cal, 1 = water, 2 = weight
  const [macroNumber, setMacroNumber] = useState(1);

  // keyValue: Graph set up/ aesthetics
  // fetchValue: Define the appropriate db column to fetch from
  // goalValue: User defined goal
  // buttonName: Aesthetic control for Button Toggle
  let [keyValue, fetchValue, goalValue, buttonName] =
    ['Calories', 'calorieSum', 3000, 'Check Water'];

  switch (macroNumber) {
    case 1:
      keyValue = 'Water';
      fetchValue = 'waterSum';
      goalValue = 5;
      buttonName = 'Check Weight';
      break;
    case 2:
      keyValue = 'Weight';
      fetchValue = 'weightSum';
      goalValue = 180;
      buttonName = 'Check Calorie';
      break;
    default:
      keyValue = 'Calories';
      fetchValue = 'calorieSum';
      goalValue = 3000;
      buttonName = 'Check Water';
      break;
  }


  // Fetch and format data appropriately
  // NOTE:
  //   This will fetch the rows of data that are available from the last seven
  //   day fetch.  If no data was input, the days may be skipped.
  const data = [];
  Object.keys(sevenDayFetch).forEach((day) => {
    // Fetch date key
    const date = Object.keys(sevenDayFetch[day]);
    // Re-format key to dow in short form (Mon, Tues, Wed)
    const dow = new Date(date).toLocaleString('en-us', {weekday: 'short'});
    // Fetch the appropriate value for the date in question
    const val = sevenDayFetch[day][date][fetchValue];

    // Add object to data array
    data.push({
      'dow': dow,
      [keyValue]: val,
    });
  });


  // Button Control
  // Switches between the different macro values
  const graphSwap = () => {
    setMacroNumber(macroNumber === 2 ?
      0 :
      (macroNumber + 1 ));
  };

  /*
    Config information for the graph to render appropriately and look nice
  */

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
    ],
    fill: [
    ],
    axisBottom: {
      'tickSize': 5,
      'tickPadding': 5,
      'tickRotation': 90,
      'legend': 'Day of Week',
      'legendPosition': 'middle',
      'legendOffset': 38,
    },
    axisLeft: {
      'tickSize': 5,
      'tickPadding': 5,
      'tickRotation': 0,
      'legend': `${keyValue}`,
      'legendPosition': 'middle',
      'legendOffset': -41,
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
        <p className={`${styles.description} subtitle`}>{`${keyValue}`}
        </p>
        <div className="chart" >
          <ResponsiveBar
            data={data}
            keys={config.keys}
            enableLabel={false}
            indexBy="dow"
            margin={config.margin}
            padding={0.3}
            colors={{scheme: 'category10'}}
            colorBy="id"
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
                lineStyle: {stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2},
                // legend: `Target ${goalValue}`,
                // legendOrientation: 'horizontal',
              },
            ]}
          />
        </div>
        <Button
          variant="outline-secondary"
          onClick={graphSwap}
          aria-label="switch-graph">
          {buttonName}
        </Button>
      </div>
    </>
  );
};

export default HistoryGraph;

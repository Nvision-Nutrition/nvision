import React, {useState, useEffect, useContext} from 'react';
import {Context} from './globalState.js';
import {ResponsiveBar} from '@nivo/bar';
import sevenDayFetch from '../db/dummyData/dummyData.js';
import styles from '../styles/Home.module.css';
import {Button, Col} from 'react-bootstrap';
import axios from 'axios';

const HistoryGraph = () => {
  // Macro Number 0 = cal, 1 = water, 2 = weight
  const [macroNumber, setMacroNumber] = useState(1);
  const [userData, setUserData] = useState(sevenDayFetch);
  const {
    userId,
    updateFlag,
    userInfo,
  } = useContext(Context);

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
      goalValue = userInfo.waterGoal;
      buttonName = 'Check Weight';
      break;
    case 2:
      keyValue = 'Weight';
      fetchValue = 'weightSum';
      goalValue = userInfo.weightGoal;
      buttonName = 'Check Calorie';
      break;
    default:
      keyValue = 'Calories';
      fetchValue = 'calorieSum';
      goalValue = userInfo.calorieGoal;
      buttonName = 'Check Water';
      break;
  }

  const getChartData = () => {
    axios({
      url: `api/progress?type=week&userId=${userId}`,
      method: 'get',
    })
        .then((result) => {
          setUserData(result.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  // Fetch and format data appropriately
  // NOTE:
  //   This will fetch the rows of data that are available from the last seven
  //   day fetch.  If no data was input, the days may be skipped.
  const data = [];
  Object.keys(userData).forEach((day) => {
    // Fetch date key
    const date = Object.keys(userData[day]);
    const dateFetch = new Date(date);
    // Re-format key to dow in short form (Mon, Tues, Wed)
    // The arrangement of date strings is off for shortform utc fetched date
    // So I had to create my own
    const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dow = shortDays[dateFetch.getDay()];
    // Fetch the appropriate value for the date in question
    const val = userData[day][date][fetchValue];

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

  useEffect(()=>{
    if (userId !== 0) {
      getChartData();
    }
  }, [userId, updateFlag]);

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
            colors={{scheme: 'pastel2'}}
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
        <Col
          className="d-flex
        justify-content-center
        text-center
        align-self-center
        align-items-center">
          <Button
            variant="outline-secondary"
            onClick={graphSwap}
            aria-label="switch-graph"
            style={{marginTop: '20px'}}>
            {buttonName}
          </Button>
        </Col>
      </div>
    </>
  );
};

export default HistoryGraph;

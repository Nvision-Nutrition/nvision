import React, {useState, useEffect, useContext} from 'react';
import {Context} from './globalState.js';

import Apple from './Apple.jsx';
import {Button, ProgressBar} from 'react-bootstrap';


const CalorieTracker = () => {
  const {userInfo, calorieCount} = useContext(Context);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const {calorieGoal} = userInfo;
    const calcProgressPercent = Math.floor(calorieCount / calorieGoal * 100)/8;
    setProgress(calcProgressPercent);
  }, [calorieCount]);

  return (
    <>
      <div className="calorie-progress-container">
        <ProgressBar
          style={{
            height: '100%',
            width: '190px',
          }}
          className="calorie-progress-bar"
        >
          {/* #ffadad, #FFD6A5,
          #FDFFB6, #CAFFBF, #9BF6FF, #A0C4FF,
          #BDB2FF, #FFC6FF */}
          <ProgressBar
            variant="red"
            now={progress}
          />
          <ProgressBar
            variant="orange"
            now={progress}
          />
          <ProgressBar
            variant="yellow"
            now={progress}
          />
          <ProgressBar
            variant="green"
            now={progress}
          />
          <ProgressBar
            variant="teal"
            now={progress}
          />
          <ProgressBar
            variant="blue"
            now={progress}
          />
          <ProgressBar
            variant="purple"
            now={progress}
          />
          <ProgressBar
            variant="pink"
            now={progress}
          />
        </ProgressBar>
        <Apple />
      </div>
    </>
  );
};

export default CalorieTracker;

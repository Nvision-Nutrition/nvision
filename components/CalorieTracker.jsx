import React, {useState, useEffect, useContext} from 'react';
import {Context} from './globalState.js';

import Apple from './Apple.jsx';
import ProgressBar from 'react-bootstrap/ProgressBar';


const CalorieTracker = () => {
  const {userInfo, calorieCount} = useContext(Context);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const {calorieGoal} = userInfo;
    const calcProgressPercent = Math.floor(calorieCount / calorieGoal * 100);
    setProgress(calcProgressPercent);
  }, [calorieCount]);

  return (
    <>
      <div className="calorie-progress-container">
        <style type="text/css">
          {`
          .progress{
            height: 18.55rem;
            width: 16.0rem;
          }
        `}
        </style>
        <ProgressBar
          className="calorie-progress-bar"
          variant='success'
          now={progress}
        />
        <Apple />
      </div>
      <button
        type="button"
        onClick={() => {
          if (progress >= 100) {
            setProgress(0);
          } else {
            setProgress(progress+20);
          }
        }}
      >
        Test
      </button>
    </>
  );
};

export default CalorieTracker;

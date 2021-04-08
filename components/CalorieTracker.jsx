import React, {useState, useEffect, useContext} from 'react';
import {Context} from './globalState.js';

import Apple from './Apple.jsx';
import {Button, ProgressBar} from 'react-bootstrap';


const CalorieTracker = () => {
  const {userInfo, calorieCount} = useContext(Context);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const {calorieGoal} = userInfo;
    const calcProgressPercent = Math.floor(calorieCount / calorieGoal * 100);
    console.log(calcProgressPercent);
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
          <ProgressBar
            variant="red"
            now={progress / 6}
          />
          <ProgressBar
            variant="orange"
            now={progress / 6}
          />
          <ProgressBar
            variant="yellow"
            now={progress /6}
          />
          <ProgressBar
            variant="green"
            now={progress /6}
          />
          <ProgressBar
            variant="purple"
            now={progress / 6}
          />
        </ProgressBar>
        <Apple />
      </div>

      <Button
        style={{
          position: 'absolute',
          zIndex: '2', bottom: '2%',
          width: '15px', height: '15px'}}
        variant="outline-success"
        type="button"
        onClick={() => {
          if (progress > 120) {
            setProgress(0);
          } else {
            setProgress(progress+20);
          }
        }}
      >
      </Button>
    </>
  );
};

export default CalorieTracker;

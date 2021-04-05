import React, {useState} from 'react';
import Apple from '../public/appleStencil.svg';

import ProgressBar from 'react-bootstrap/ProgressBar';

const CalorieTracker = () => {
  const [progress, setProgress] = useState(60);

  return (
    <>
      <div className="calorie-progress-container">
        <style type="text/css">
          {`
          .progress{
            height: 18.55rem;
            width: 16.1rem;
          }
        `}
        </style>
        <ProgressBar
          className="calorie-progress-bar"
          variant='success'
          now={progress}
        />
        <Apple className="calorie-progress-overlay" />
      </div>
      <button
        type="button"
        onClick={() => {
          if (progress === 100) {
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

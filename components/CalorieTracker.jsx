import React, {useState} from 'react';
import Apple from '../public/appleStencil.svg';

import ProgressBar from 'react-bootstrap/ProgressBar';

const CalorieTracker = () => {
  const [progress] = useState(0);

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
    </>
  );
};

export default CalorieTracker;

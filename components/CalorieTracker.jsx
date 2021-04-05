import React, {useState} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const CalorieTracker = () => {
  const [progress, setProgress] = useState(60);

  return (
    <>
      <div>
        Test
        <ProgressBar
          className="calorie-progress-bar"
          now={progress}
          variant="success"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (progress === 100) {
            setProgress(20);
          } else {
            setProgress(progress + 20);
          }
        }}
      >
        Test
      </button>
    </>
  );
};

export default CalorieTracker;

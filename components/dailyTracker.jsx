import React, {useState} from 'react';
import styles from '../styles/Home.module.css';
import CalorieTracker from './CalorieTracker.jsx';
import InsertModals from './InsertModals.jsx';

const DailyTracker = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('');

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);


  return (
    <>
      <div className={`${styles.card} daily-tracker`}>
        <p className={`${styles.description} subtitle`}>{`Daily Tracker`}</p>
        <CalorieTracker />
        <button
          onClick={(e) => {
            handleOpen();
            setType('food');
          }}
          className={`${styles.card} input-button`}
          title='calorie-btn'>
          Add Calories
        </button>
        <button onClick={(e) => {
          handleOpen();
          setType('water');
        } }
        className={`${styles.card} input-button`}>
          Add Water
        </button>
        <InsertModals
          show={show}
          type={type}
          handleClose={handleClose}
          onHide={handleClose}
        />
      </div>
    </>
  );
};

export default DailyTracker;

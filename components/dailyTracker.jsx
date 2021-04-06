import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
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
        <Button
          variant="outline-success"
          onClick={(e) => {
            handleOpen();
            setType('food');
          }}
          style={{
            marginRight: 20,
          }}
          title='calorie-btn'>
          Add Calories
        </Button>
        <Button
          variant="outline-primary"
          onClick={(e) => {
            handleOpen();
            setType('water');
          } }>
          Add Water
        </Button>
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

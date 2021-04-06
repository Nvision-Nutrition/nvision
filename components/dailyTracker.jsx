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
            width: '30%',
          }}
          title='calorie-btn'>
          <img src='/restaurant.png'
            style={{
              height: '28px',
              width: '28px',
            }}/>
        </Button>
        <Button
          variant="outline-primary"
          style={{
            width: '30%',
          }}
          onClick={(e) => {
            handleOpen();
            setType('water');
          } }>
          <img src='/drop.png'
            style={{
              height: '28px',
              width: '28px',
            }}/>
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

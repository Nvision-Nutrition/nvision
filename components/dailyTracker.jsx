import React from 'react';
import styles from '../styles/Home.module.css';
import CalorieTracker from './CalorieTracker.jsx';

const DailyTracker = () => {
  return (
    <>
      <div className={`${styles.card} daily-tracker`}>
        <p className={`${styles.description} subtitle`}>{`Daily Tracker`}</p>
        <CalorieTracker />
      </div>
    </>
  );
};

export default DailyTracker;

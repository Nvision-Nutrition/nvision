import React from 'react';
import styles from '../styles/Home.module.css';

const DailyTracker = () => {
  return (
    <>
      <div className={`${styles.card} daily-tracker`}>
        <p className={`${styles.description} subtitle`}>{`Daily Tracker`}</p>
      </div>
    </>
  );
};

export default DailyTracker;

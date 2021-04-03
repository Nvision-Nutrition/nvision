import React from 'react';
import styles from '../styles/Home.module.css';

const WaterHistory = () => {
  return (
    <>
      <div className={`${styles.card} caloric-history chart`}>
        <p className={`${styles.description} subtitle`}>{`Caloric History`}</p>
        
      </div>
    </>
  );
};

export default WaterHistory;

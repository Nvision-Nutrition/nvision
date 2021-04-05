import React from 'react';
import styles from '../styles/Home.module.css';

const HistoryGraph = () => {
  return (
    <>
      <div className={`${styles.card} history-graph`}>
        <p className={`${styles.description} subtitle`}>{`Last 7-Days`}</p>
      </div>
    </>
  );
};

export default HistoryGraph;

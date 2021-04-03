import React from 'react';
import {v4 as uuidv4} from 'uuid';
import styles from '../styles/Home.module.css';

const WaterHistory = () => {
  const generateWaterGraph = (waterDrank = 62, waterGoal = 100) => {
    const waterPercentage = waterGoal > 0 ?
      Math.round((waterDrank / waterGoal) * 10) :
      0;

    let remainder = 0;
    remainder = waterPercentage - remainder;
    const bottleArray = [];
    for (let j = 0; j < 10; j += 1) {
      switch (remainder) {
        case 0:
          bottleArray.push(
              <div key={uuidv4()}>
                <img
                  src="/full_bottle.jpg"
                  alt=""
                  className="bottle-image" />
              </div>);
          break;
        default:
          bottleArray.push(
              <div key={uuidv4()}>
                <img
                  src="/crushed_bottle.jpeg"
                  alt=""
                  className="bottle-image" />
              </div>);
          remainder -= 1;
          break;
      }
    }
    return (
      <div
        className="inline-bottle"
        style={{display: 'inline-flex'}}
        key={uuidv4()}
      >
        {bottleArray}
      </div>);
  };

  return (
    <>
      <div className={`${styles.card} water-history chart`}>
        <p className={`${styles.description} subtitle`}>{`Water Intake`}</p>
        { generateWaterGraph() }
      </div>
    </>
  );
};

export default WaterHistory;

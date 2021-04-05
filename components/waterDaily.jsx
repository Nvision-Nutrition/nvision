import React from 'react';
import {v4 as uuidv4} from 'uuid';
import styles from '../styles/Home.module.css';

const WaterDaily = () => {
  const generateWaterGraph = (waterDrank = 0, waterGoal = 100) => {
    /*
     This finds the percentage rounded to the tens digit 62 => 60 => 6,
      representing 6 crushed water bottles out of 10
    */
    const waterPercentage = waterGoal > 0 ?
      Math.round((waterDrank / waterGoal) * 10) :
      0;

    const bottleArray = [];
    for (let j = 0; j < 10; j += 1) {
      /* Iteration of 6/10 walk through - waterPercentage === 6 -
         seeking to add 6 crushed bottles, and four full
      */
      switch (waterPercentage) {
        case 0: // waterPercentage = 6 - will not add a full bottle
          bottleArray.push(
              <div key={uuidv4()}>
                <img
                  src="/full_bottle.jpg"
                  alt=""
                  className="bottle-image" />
              </div>);
          break;
          // case 10: // waterPercentage = 6 - will not add a full bottle
          // bottleArray.push(
          //     <div key={uuidv4()}>
          //       <img
          //         src="/massive_celebration_waterfall.gif"
          //         alt=""
          //         className="bottle-image" />
          //     </div>);
          // break;
          // case 1: // waterPercentage = 6 - will not add a full bottle
          // bottleArray.push(
          //     <div key={uuidv4()}>
          //       <img
          //         src="/fancy_crushed_bottle.jpg"
          //         alt=""
          //         className="bottle-image" />
          //     </div>);
          // break;
        default: // waterPercentage = 6 - execute default and add crushed bottle
          bottleArray.push(
              <div key={uuidv4()}>
                <img
                  src="/crushed_bottle.jpeg"
                  alt=""
                  className="bottle-image" />
              </div>);
          /*
            waterPercentage decremented 1 to 5.
            Once all "drank" percentage points have run out,
            full bottles will be added to the result array.
          */
          waterPercentage -= 1;
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
      <div className={`${styles.card} water-daily chart`}>
        <p className={`${styles.description} subtitle`}>{`Water Intake`}</p>
        { generateWaterGraph() }
      </div>
    </>
  );
};

export default WaterDaily;

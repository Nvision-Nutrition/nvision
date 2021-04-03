import React, {useState, useEffect} from 'react';
// import axios from 'axios';  
import { v4 as uuidv4 } from 'uuid';

const WaterTracker = () => {
  const generateWaterGraph = (waterDrank=62, waterGoal=100) => {
    const waterPercentage = waterGoal > 0 ? Math.round((waterDrank/waterGoal)*10) : 0;
    console.log(waterDrank)
    console.log(waterGoal)
    console.log(waterPercentage)

    let remainder = 0;
    remainder = waterPercentage - remainder;
    const bottleArray = [];
    for (let j = 0; j < 10; j += 1) {
      switch (remainder) { 
        case 0:
          bottleArray.push(<div key={uuidv4()}><img src="/full_bottle.jpg" alt="" className="bottle-image" /></div>);
          break;
        default:
          bottleArray.push(<div key={uuidv4()}><img src="/crushed_bottle.jpeg" alt="" className="bottle-image" /></div>);
          remainder -= 1;
          break;
      }
    }
    return (<div className="inline-bottle" style={{ display: 'inline-flex' }} key={uuidv4()}>{bottleArray}</div>);
  };

  return (
    <>
      <div>
        { generateWaterGraph() }
      </div>
    </>
  )
}

export default WaterTracker;
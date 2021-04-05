import React, {useContext} from 'react';
import {Context} from './globalState.js';
import styles from '../styles/Home.module.css';

const CaloricHistory = () => {
  const {count, dummyString} = useContext(Context);

  return (
    <>
      <div className={`${styles.card} caloric-history chart`}>
        <p className={`${styles.description} subtitle`}>{`Caloric History`}</p>

        {/* Below div is just for Global State demo purposes} */}
        <div>
            The count is {count}. <br></br>
             Here is another one: {dummyString}
        </div>

      </div>
    </>
  );
};

export default CaloricHistory;

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import {GlobalStateProvider} from '../components/globalState.js';
import NvisionNavbar from '../components/nvisionNavbar.jsx';
import CaloricHistory from '../components/caloricHistory.jsx';
import WaterHistory from '../components/waterHistory.jsx';
import DailyTracker from '../components/dailyTracker.jsx';
import Login from '../components/login.jsx';
import SignUp from '../components/signUp.jsx';

const App = () => {
  return (
    <GlobalStateProvider>
      <div className={styles.container}>
        <Head>
          <title>nVision nutrition</title>
          <link rel="icon" href="/favicon.ico" />
          <link href='https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap" rel="stylesheet">' rel="stylesheet" />
        </Head>
        <NvisionNavbar />
        <main className={styles.main}>
          <DailyTracker />
          <CaloricHistory />
          <WaterHistory />
        </main>
        <Login />
        <SignUp />
      </div>
    </GlobalStateProvider>
  );
};

export default App;

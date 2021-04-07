import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, {useContext, useState, useEffect} from 'react';
import {GlobalStateProvider} from '../components/globalState.js';
import NvisionNavbar from '../components/nvisionNavbar.jsx';
import Login from '../components/login.jsx';
import SignUp from '../components/signUp.jsx';
import dynamic from 'next/dynamic';
import HistoryGraph from '../components/historyGraph.jsx';
import WaterDaily from '../components/waterDaily.jsx';
import axios from 'axios';

const DailyTracker = dynamic(
  () => {
    return import("../components/dailyTracker.jsx");
  },
  { ssr: false }
);

const App = () => {

  const [globalTheme, setGlobalTheme] = useState('light');

  return (
    <div style={globalTheme === 'dark' ? {backgroundColor: '#343A40'} : null}>
      <Head>
        <title>nVision nutrition</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap" rel="stylesheet">' rel="stylesheet" />
      </Head>
      <GlobalStateProvider>
        <NvisionNavbar setGlobalTheme={setGlobalTheme}/>
        <div className={styles.container}>
          <main className={styles.main}>
            <DailyTracker />
            <WaterDaily />
            <HistoryGraph />
          </main>
          <Login />
          <SignUp />
        </div>
      </GlobalStateProvider>
    </div>
  );
};

export default App;

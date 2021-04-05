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
<<<<<<< HEAD
        <NvisionNavbar />
=======
        <Navbar>
          <Navbar.Brand href="#home">
            <strong>
              nVision Nutrition
            </strong>
            <span>
              <i>
                The Nutritious App for Vision
              </i>
            </span>
          </Navbar.Brand>
          <NavDropdown
            title="Sign Out"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item >
              {`Account Page PlaceHolder`}
              {`Sign Out PlaceHolder`}
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
>>>>>>> 9c10eefb4236380ca10bbd21ad0d7a948b1452ba
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

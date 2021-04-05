import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Navbar, NavDropdown} from 'react-bootstrap';
import React from 'react';
import dynamic from 'next/dynamic';
import CaloricHistory from '../components/caloricHistory.jsx';
import WaterHistory from '../components/waterHistory.jsx';
const DailyTracker = dynamic(
  () => {
    return import("../components/dailyTracker.jsx");
  },
  { ssr: false }
);

const App = () => {
  return (
    <GlobalStateProvider>
      <div className={styles.container}>
        <Head>
          <title>The Nutritious App for Vision</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
        <main className={styles.main}>
          <DailyTracker />
          <CaloricHistory />
          <WaterHistory />
        </main>
      </div>
    </GlobalStateProvider>
  );
};

export default App;

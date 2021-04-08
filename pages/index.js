import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Button, Row, Image} from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/client';
import {GlobalStateProvider} from '../components/globalState.js';
import React, {useContext, useState, useEffect} from 'react';
import NvisionNavbar from '../components/nvisionNavbar.jsx';
import SignUp from '../components/signUp.jsx';
import dynamic from 'next/dynamic';
import { Container } from '@material-ui/core';
import HistoryGraph from '../components/historyGraph.jsx';
import WaterDaily from '../components/waterDaily.jsx';
import axios from 'axios';
import Confetti from 'react-confetti';


const DailyTracker = dynamic(
  () => {
    return import("../components/dailyTracker.jsx");
  },
  { ssr: false }
);

const App = () => {
  //what's not seen is that next js is adding a div before render
  const [globalTheme, setGlobalTheme] = useState('light');
  const [session, loading] = useSession();
  const [signup, setSignup] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  if (loading) {
    return <p>Loading...</p>
  }

  const handleSignUp = () => {
    setSignup(true);
  }

  return (
    <div style={globalTheme === 'dark' ? {backgroundColor: '#343A40'} : null}>
      <Head>
        <title>NVision Nutrition</title>
        <link rel="icon" href="/logo.png" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet"></link>
        <link href='https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap" rel="stylesheet">' rel="stylesheet" />
      </Head>
      {!session && (
        !signup ? (
        //not a session and not yet signing up
          <Container style={{
            height: '100vh',
            backgroundImage: 'url("https://images7.alphacoders.com/912/thumbbig-912808.jpg")',
            backgroundColor: 'white',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}>
            <Container style={{
              paddingTop: '20vh',
            }}>
              <Row className="justify-content-center">
                <Image src='logo.png' style={{
                  width: '20vh'
                }} />
              </Row>
              <Row className="justify-content-center">
                <Button variant="primary" size="lg" onClick={signIn} style={{
                  width: '50%',
                  height: '10vh',
                }}>Log in</Button>{' '}
              </Row>
              <br />
              <Row className="justify-content-center">
                <Button variant="primary" size="lg" onClick={handleSignUp} style={{
                  width: '50%',
                  height: '10vh',
                }}>Sign up</Button>{' '}
              </Row>
            </Container>
          </Container>
      ) : (
        //not a session and signing up
        //after hitting submit on signing up can I bypass auth with the cookie?
        <>
         <SignUp signup={signup} setSignup={setSignup}/>
        </>
      ))}
      {session && (
        <GlobalStateProvider session={session}>
        {
          celebrate && <Confetti/>
        }
        <NvisionNavbar user={session} signOut={signOut} setGlobalTheme={setGlobalTheme}/>
        <div className={styles.container}>
          <main className={styles.main}>
            <DailyTracker celebrate={celebrate} setCelebrate={setCelebrate}/>
            <WaterDaily />
            <HistoryGraph />
          </main>
        </div>
      </GlobalStateProvider>
      )}
    </div>
  );
};

export default App;

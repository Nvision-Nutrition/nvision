import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Button, Row, Image} from 'react-bootstrap';
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import {GlobalStateProvider} from '../components/globalState.js';
import NvisionNavbar from '../components/nvisionNavbar.jsx';
import SignUp from '../components/signUp.jsx';
import dynamic from 'next/dynamic';
import CaloricHistory from '../components/caloricHistory.jsx';
import WaterHistory from '../components/waterHistory.jsx';
import { Container } from '@material-ui/core';
const DailyTracker = dynamic(
  () => {
    return import("../components/dailyTracker.jsx");
  },
  { ssr: false }
);

const App = () => {
  const [session, loading] = useSession();
  const [signup, setSignup] = useState(false); 

  if (loading) {
    return <p>Loading...</p>
  }

  const handleSignUp = () => {
    setSignup(true);
  }
  //what's not seen is that next js is adding a div before render
  return (
    <>
      <Head>
        <title>nVision nutrition</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans&display=swap" rel="stylesheet">' rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
      </Head>
      {!session && (
        !signup ? (
        //not a session and not yet signing up 
        // <Button variant="outline-primary" size="lg" onClick={signIn}>Log in</Button>{' '}
        // <Button variant="outline-primary" size="lg" onClick={handleSignUp}>Sign up</Button>{' '}
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
        <GlobalStateProvider>
        <div>Signed in as {session.user.name}<br/>
            <button onClick={signOut}>Sign Out</button>
            </div>
          <NvisionNavbar />
          <div className={styles.container}>
            <main className={styles.main}>
              <DailyTracker />
              <CaloricHistory />
              <WaterHistory />
            </main>
          </div>
        </GlobalStateProvider>
      )}
      </>
  );
};

export default App;

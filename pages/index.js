import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Navbar, NavDropdown} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import {GlobalStateProvider} from '../components/globalState.js';
import NvisionNavbar from '../components/nvisionNavbar.jsx';
import Login from '../components/login.jsx';
import SignUp from '../components/signUp.jsx';
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
        <>
          <p1>Not signed in</p1><br/>
          <button onClick={signIn}>Log in</button>
          <button onClick={handleSignUp}>Sign up</button>
          
        </>
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
            <Login />
            <SignUp />
          </div>
        </GlobalStateProvider>
      
          
     
      )}
      </>
  );
};

export default App;

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Navbar, NavDropdown} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Login from '../components/login.jsx';
import SignUp from '../components/signUp.jsx';
import { signIn, signOut, useSession } from 'next-auth/client';
import {GlobalStateProvider} from '../components/globalState.js';
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
      )}
    </>
  );
};

export default App;

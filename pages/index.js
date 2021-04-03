import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import WaterTracker from '../components/waterTracker.jsx'


// this is a shortened nameless version of class App extends React.Component
// without the need to type "export default App;" at the bottom
const App = () => {
  // the index.js file is always the top level component of the next.JS app

  // css can be imported in its own module specific files or globally

  // HTTP requests are made to api/hello as one route
  // adding another route is as simple as creating a new file in the api folder
  // - route would then be api/greeting

  // DO NOT USE EXPRESS
  // it will blow up the vercel network and not allow us to deploy there.
  // Next is designed to be used with bare node with a little spice

  return (
    <div className={styles.container}>
      <Head>
        <title>The Nutritious App for Vision</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <WaterTracker />
      </main>
    </div>
  );
};

export default App;

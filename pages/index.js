import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { Component } from 'react';


// this is a shortened nameless version of class App extends React.Component 
// without the need to type "export default App;" at the bottom

export default class extends Component {
  // the index.js file is always the top level component of the next.JS app

  // css can be imported in its own module specific files or globally 
  
  // HTTP requests are made to api/hello as one route
  //  adding another route is as simple as creating a new file called greeting.js in the api folder - route would then be api/greeting

  // DO NOT USE EXPRESS, it is possible that it can work and it will blow up the vercel network and not allow use to deploy there. Next is designed to be used
  // with bare node with a little spice that they added


  constructor(props) {
    super(props)
    this.state = {

    }
    //room to bind functions


  }
  



  render() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Nutritious App for Vision</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

     
    </div>
  )
  }
}

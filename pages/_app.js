/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;

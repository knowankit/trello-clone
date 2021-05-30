import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@/src/styles/default.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

const theme = extendTheme({
  colors: {
    brand: '#0079bf',
    success: '#70b500',
    danger: '#eb5a46',
    info: '#ff9f1a',
    warning: '#f2d600',
    darkmode: '#071e3d',
    lightblue: '#f2faf9'
  }
});

const TrelloApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Trello clone</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

TrelloApp.propTypes = {
  pageProps: PropTypes.object
};

export default TrelloApp;

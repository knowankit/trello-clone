import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@/src/styles/default.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

const theme = extendTheme({
  colors: {
    brand: '#0079bf',
    success: '#00bd56',
    danger: '#eb5a46',
    info: '#ff9f1a',
    warning: '#f2d600',
    bg: '#ffffff',
    color: '#231e23',
    lightblue: '#f2faf9',
    link: '#0079bf'
  }
});

const dark = extendTheme({
  colors: {
    brand: '#071e3d',
    success: '#21e6c1',
    danger: '#eb5a46',
    info: '#278ea5',
    warning: '#f2d600',
    bg: '#071e3d',
    color: '#ffffff',
    lightblue: '#21e6c1',
    link: '#21e6c1'
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

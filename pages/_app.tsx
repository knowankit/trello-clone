import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@/src/styles/default.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';

import 'nprogress/nprogress.css';

const theme = extendTheme({
  colors: {
    brand: '#0079bf',
    success: '#70b500',
    danger: '#eb5a46',
    info: '#ff9f1a',
    warning: '#f2d600',
    darkblue: '#eae6ff',
    lightblue: '#f2faf9',
    performance: '#0079bf',
    bug: '#eb5a46',
    feature: '#61bd4f',
    information: '#ff9f1a'
  }
});

const TrelloApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Trello clone</title>
        <link rel="shortcut icon" href="/trello-icon.svg"></link>
      </Head>
      <NextNprogress color="#0079bf" startPosition={0.3} stopDelayMs={200} height={4} />
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

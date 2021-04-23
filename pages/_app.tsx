import React from 'react';
import PropTypes from 'prop-types';

import { ChakraProvider } from '@chakra-ui/react';

function TrelloApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

TrelloApp.propTypes = {
  pageProps: PropTypes.object,
  Component: PropTypes.element
};

export default TrelloApp;

import React from 'react'

import { ChakraProvider } from "@chakra-ui/react"

function TrelloApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default TrelloApp

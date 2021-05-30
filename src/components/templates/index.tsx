import React from 'react';
import { Box } from '@chakra-ui/react';

const Templates = (): JSX.Element => {
  return (
    <Box
      minHeight="50vh"
      flexGrow={3}
      mx="2%"
      boxShadow="dark-lg"
      rounded="lg"
      backgroundColor="darkmode"
      color="white"
      p="1rem">
      <h1>Templates page</h1>
    </Box>
  );
};

export default Templates;

import React from 'react';
import { Box } from '@chakra-ui/react';

const Boards = (): JSX.Element => {
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
      <p>Instructions or Basic information about this tool</p>
    </Box>
  );
};

export default Boards;

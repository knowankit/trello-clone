import React from 'react';
import { Box } from '@chakra-ui/react';

const Boards = (): JSX.Element => {
  return (
    <Box minHeight="50vh" flexGrow={3} mx="2%" boxShadow="md" rounded="lg" bg="white" p="1rem">
      <h1>you can visit the Boards Page to see the Trello-clone functionality.</h1>
    </Box>
  );
};

export default Boards;

import { Box, Heading, Button } from '@chakra-ui/react';
import PropType from 'prop-types';
import BoardSettings from '@/src/components/sub-navbar/board-settings';

import React from 'react';

const SubNavbar = ({ board }) => {
  return (
    <Box height="50px" bg="brand" boxShadow="md" display="flex" alignItems="center">
      <Heading ml="0.5rem" color="white" as="h3" size="lg" whiteSpace="nowrap">
        {board && board.name}
      </Heading>
      <BoardSettings />
    </Box>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;

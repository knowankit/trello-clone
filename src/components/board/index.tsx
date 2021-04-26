import { Box } from '@chakra-ui/layout';
import React from 'react';
import Navbar from '@/src/components/navbar';
import SubNavbar from '@/src/components/sub-navbar';
import PropType from 'prop-types';

const Board = ({ board }) => {
  return (
    <>
      <Navbar />
      <SubNavbar board={board} />
      <Box>
        {board.id}
        {board.name}
      </Box>
    </>
  );
};

Board.propTypes = {
  board: PropType.object
};
export default Board;

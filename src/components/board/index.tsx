import React from 'react';
import { Box } from '@chakra-ui/react';
import UserNavbar from '@/src/components/user-navbar';
import SubNavbar from '@/src/components/sub-navbar';
import BoardColumns from '@/src/components/board/columns';
import PropType from 'prop-types';

const Board = ({ board }): JSX.Element => {
  return (
    <Box
      backgroundImage="url('/boards/board-background.jpg')"
      backgroundPosition="center"
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundSize="cover">
      <UserNavbar />
      <SubNavbar board={board} />
      <BoardColumns />
    </Box>
  );
};

Board.propTypes = {
  board: PropType.object
};

export default Board;

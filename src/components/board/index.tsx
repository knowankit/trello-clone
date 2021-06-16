import React from 'react';
import { Box } from '@chakra-ui/react';
import UserNavbar from '@/src/components/user-navbar';
import SubNavbar from '@/src/components/sub-navbar';
import { useAppSelector } from '@/src/hooks';

import BoardColumns from '@/src/components/board/columns';
import PropType from 'prop-types';

const Board = (): JSX.Element => {
  const board = useAppSelector((state) => state.board.board);

  return (
    <Box
      backgroundImage={`url('${board.backgroundImage}')`}
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

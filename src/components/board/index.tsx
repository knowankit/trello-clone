import React from 'react';
import Navbar from '@/src/components/navbar';
import SubNavbar from '@/src/components/sub-navbar';
import BoardColumns from '@/src/components/board/columns';
import PropType from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Board = ({ board }) => {
  return (
    <>
      <Navbar />
      <SubNavbar board={board} />
      <DndProvider backend={HTML5Backend}>
        <BoardColumns />
      </DndProvider>
    </>
  );
};

Board.propTypes = {
  board: PropType.object
};

export default Board;

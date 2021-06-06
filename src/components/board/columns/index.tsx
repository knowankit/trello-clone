import React, { useState, FC } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';
import CardDetailsModal from '@/src/components/board/columns/modals/card-details-modal';
import Column from '@/src/components/board/columns/column';
// import { GrDrag } from 'react-icons/gr';
import { CardDetail } from '@/src/types/cards';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { addColumnToBoard, fetchColumns } from '@/src/slices/columns';
import { updateCard, fetchCards } from '@/src/slices/cards';

import shortId from 'shortid';
import { DragDropContext } from 'react-beautiful-dnd';

const BoardColumns: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const columns = useAppSelector((state) => state.columns.columns);
  const cards = useAppSelector((state) => state.cards.cards);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardDetail, setCardDetail] = useState<CardDetail>({ _id: '', title: '', description: '' });

  const showCardDetail = (cardId: string) => {
    const card = cards.filter((card) => card._id === cardId);

    setCardDetail(card[0]);
    onOpen();
  };

  const addColumn = async () => {
    const columnId = shortId.generate();

    await dispatch(addColumnToBoard(columnId));
    await dispatch(fetchColumns());
  };

  const filterCards = (columnId: string) => {
    const filteredCards = cards.filter((card) => card.columnId === columnId);

    return filteredCards;
  };

  const onDragEnd = (result) => {
    console.log('result', result);
    const { destination, source, draggableId } = result;

    const card = cards.filter((card) => card._id === draggableId)[0];

    const patchCard = {
      _id: card._id,
      title: card.title,
      description: card.description,
      columnId: destination.droppableId
    };
    // If card movement in the same column
    if (destination.droppableId === source.droppableId) {
      dispatch(updateCard(patchCard));
      dispatch(fetchCards());
    } else {
      dispatch(updateCard(patchCard));
      dispatch(fetchCards());
    }
  };

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 122px)"
      overflowX="auto"
      id="parent-of-columns">
      <Box display="flex" position="absolute" overflowY="auto" height="100%">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              id={column._id}
              index={index}
              cards={filterCards(column._id)}
              showCardDetail={showCardDetail}
            />
          ))}
        </DragDropContext>
        <AddColumnButton addColumn={addColumn} />
      </Box>
      {isOpen && <CardDetailsModal isOpen={isOpen} onClose={onClose} card={cardDetail} />}
    </Box>
  );
};

export default BoardColumns;

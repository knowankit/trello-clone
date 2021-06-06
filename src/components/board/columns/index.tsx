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
import { fetchCards, updateCardSequence } from '@/src/slices/cards';

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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // Don't do anything where there is not desitination
    if (!destination) {
      return;
    }

    // Do nothing if the card is put back where it was
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // If card movement in the same column
    if (destination.droppableId === source.droppableId) {
      await changeCardSequence(destination.index, destination.droppableId, draggableId);
    } else {
      await changeCardSequence(destination.index, destination.droppableId, draggableId);
    }

    await dispatch(fetchCards());
  };

  const changeCardSequence = async (
    destinationIndex: number,
    destinationColumnId: string,
    cardId: string
  ) => {
    const cardsFromColumn = cards.filter(
      (card) => card.columnId === destinationColumnId && card._id !== cardId
    );
    const sortedCards = cardsFromColumn.sort((a, b) => a.sequence - b.sequence);

    let sequence = destinationIndex === 0 ? 1 : sortedCards[destinationIndex - 1].sequence + 1;

    const patchCard = {
      _id: cardId,
      sequence,
      columnId: destinationColumnId
    };

    await dispatch(updateCardSequence(patchCard));

    for (let i = destinationIndex; i < sortedCards.length; i++) {
      const card = sortedCards[i];
      sequence += 1;
      const patchCard = {
        _id: card._id,
        sequence
      };

      await dispatch(updateCardSequence(patchCard));
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

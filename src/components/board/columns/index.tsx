import React, { useState, FC } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';
import CardDetailsModal from '@/src/components/board/columns/modals/card-details-modal';
import Column from '@/src/components/board/columns/column';
import { CardDetail } from '@/src/types/cards';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import {
  addColumnToBoard,
  fetchColumns,
  updateColumnSequenceToLocalState,
  updateColumnSequence
} from '@/src/slices/columns';
import { updateCardSequence, updateCardSequenceToLocalState } from '@/src/slices/cards';

import shortId from 'shortid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
    const { destination, source, draggableId, type } = result;

    // Don't do anything where there is not destination
    if (!destination) {
      return;
    }

    // Do nothing if the card is put back where it was
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // If card is being dragged
    if (type === 'card') {
      await saveCardSequence(destination.index, destination.droppableId, draggableId);
    }

    // If column is being dragged
    if (type === 'column') {
      await saveColumnSequence(destination.index, draggableId);
    }
  };

  const saveCardSequence = async (
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

    // This is just for updating local state so that there won't be any lag after saving the sequence and fetching again
    // Now we don't to fetch the cards again
    await dispatch(updateCardSequenceToLocalState(patchCard));
    await dispatch(updateCardSequence(patchCard));

    for (let i = destinationIndex; i < sortedCards.length; i++) {
      const card = sortedCards[i];
      sequence += 1;

      const patchCard = {
        _id: card._id,
        sequence,
        columnId: destinationColumnId
      };

      await dispatch(updateCardSequenceToLocalState(patchCard));
      await dispatch(updateCardSequence(patchCard));
    }
  };

  const saveColumnSequence = async (destinationIndex: number, columnId: string) => {
    // Remove the column which is dragged from the list
    const filteredColumns = columns.filter((column) => column._id !== columnId);

    const sortedColumns = filteredColumns.sort((a, b) => a.sequence - b.sequence);

    let sequence = destinationIndex === 0 ? 1 : sortedColumns[destinationIndex - 1].sequence + 1;

    const patchColumn = {
      _id: columnId,
      sequence
    };

    // This is just for updating local state so that there won't be any lag after saving the sequence and fetching again
    await dispatch(updateColumnSequenceToLocalState(patchColumn));
    await dispatch(updateColumnSequence(patchColumn));

    for (let i = destinationIndex; i < sortedColumns.length; i++) {
      const column = sortedColumns[i];

      sequence += 1;

      const patchColumn = {
        _id: column._id,
        sequence
      };

      await dispatch(updateColumnSequenceToLocalState(patchColumn));
      await dispatch(updateColumnSequence(patchColumn));
    }

    // Added temporarily to refresh the page on column, otherwise it will not reflect the changes
    // Will be fixed later
    window.location.reload();
  };

  return (
    <Box display="block" position="relative" height="calc(100vh - 90px)" overflowX="auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-collumns" direction="horizontal" type="column">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              position="absolute"
              overflowY="auto">
              {columns.map((column, index) => (
                <Column
                  key={column._id}
                  column={column}
                  id={column._id}
                  index={index}
                  cards={filterCards(column._id)}
                  showCardDetail={showCardDetail}
                />
              ))}
              {provided.placeholder}
              <AddColumnButton addColumn={addColumn} />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {isOpen && <CardDetailsModal isOpen={isOpen} onClose={onClose} card={cardDetail} />}
    </Box>
  );
};

export default BoardColumns;

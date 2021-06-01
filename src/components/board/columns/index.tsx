import React, { useState, FC } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';
import CardDetailsModal from '@/src/components/board/columns/modals/card-details-modal';
// import Cards from '@/src/components/board/columns/cards';
import Column from '@/src/components/board/columns/column';
// import { GrDrag } from 'react-icons/gr';
import { CardDetail } from '@/src/types/cards';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { addColumnToBoard, fetchColumns } from '@/src/slices/columns';
import shortId from 'shortid';

const BoardColumns: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const columns = useAppSelector((state) => state.columns.columns);

  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardDetail, setCardDetail] = useState<CardDetail>({ id: '', title: '', description: '' });

  const showCardDetail = (cardIndex, columnsIndex) => {
    setCurrentColumnIndex(columnsIndex);
    setCurrentCardIndex(cardIndex);

    const column = columns[columnsIndex];
    const card = column.cards[cardIndex];

    setCardDetail(card);
    onOpen();
  };

  const addColumn = async () => {
    const columnId = shortId.generate();
    await dispatch(addColumnToBoard(columnId));
    await dispatch(fetchColumns());
  };

  const addCard = (index: number) => {
    // Fetch particular column
    const column = columns[index];
    const cardId = shortId.generate();
    // Push the card details
    column.cards.push({ title: 'Card title' + new Date().toString(), id: cardId });

    // Fetch all the columns
    const temp = columns;

    // Delete the old list and add the new list
    // temp.splice(index, 1, column);
    // setColumns([...temp]);
  };

  const handleCardChange = (event) => {
    // Fetch active card and update the value
    const tempCard = cardDetail;
    tempCard[event.target.name] = event.target.value;

    // Set the current card to state. This will update the fiels present in the modal
    setCardDetail({ ...tempCard });

    // Fetch edit card column and update the edited card value in that column
    const column = columns[currentColumnIndex];
    column.cards[currentCardIndex] = tempCard;

    // Fetch all the columns and update the edited column
    const tempColumns = columns;
    // tempColumns.splice(currentColumnIndex, 1, column);

    // setColumns([...tempColumns]);
  };
  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 122px)"
      overflowX="auto"
      id="parent-of-columns">
      <Box display="flex" position="absolute" overflowY="auto" height="100%">
        {columns.map((column, index) => (
          <Column
            key={index}
            column={column}
            id={column._id}
            index={index}
            addCard={addCard}
            showCardDetail={showCardDetail}
          />
        ))}
        <AddColumnButton addColumn={addColumn} />
      </Box>
      <CardDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        cardDetail={cardDetail}
        handleCardChange={handleCardChange}
      />
    </Box>
  );
};

export default BoardColumns;

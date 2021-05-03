import React, { useState } from 'react';
import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';
import CardDetailsModal from '@/src/components/board/columns/modals/card-details-modal';
import Cards from '@/src/components/board/columns/cards';
import { GrDrag } from 'react-icons/gr';
import { CardDetail } from '@/src/types/cards';
import shortId from 'shortid';

const BoardColumns = () => {
  const tempData = [
    { columnName: 'To-Do', cards: [] },
    { columnName: 'In Progress', cards: [] },
    { columnName: 'Done', cards: [] }
  ];

  const [columns, setColumns] = useState(tempData);
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardDetail, setCardDetail] = useState<CardDetail>({ title: '', id: '' });

  const showCardDetail = (cardIndex, columnsIndex) => {
    setCurrentColumnIndex(columnsIndex);
    setCurrentCardIndex(cardIndex);

    const column = columns[columnsIndex];
    const card = column.cards[cardIndex];

    setCardDetail(card);
    onOpen();
  };

  const loadColumns = (column, columnIndex) => {
    return (
      <React.Fragment key={columnIndex}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Heading as="h6" size="sm" ml="10px" mt="5px" textAlign="center">
            {column.columnName}
          </Heading>
          <Box my="10px" mr="10px" float="right" cursor="grab">
            <GrDrag />
          </Box>
        </Box>

        <Cards showCardDetail={showCardDetail} cards={column.cards} columnIndex={columnIndex} />
        <Button
          size="xs"
          my="10px"
          mx="auto"
          width="80%"
          bg="brand"
          display="block"
          color="white"
          onClick={() => {
            addCard(columnIndex);
          }}>
          Add a card
        </Button>
      </React.Fragment>
    );
  };

  const addColumn = () => {
    setColumns([...columns, { columnName: 'Test', cards: [] }]);

    // Scroll to the right when column is added
    // const parentOfColumns = document.getElementById('parent-of-columns')
    // parentOfColumns.scrollLeft = 300
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
    temp.splice(index, 1, column);
    setColumns([...temp]);
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
    tempColumns.splice(currentColumnIndex, 1, column);

    setColumns([...tempColumns]);
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
          <Box
            rounded="lg"
            key={index}
            width="300px"
            overflowY="auto"
            height="calc(100vh - 150px)"
            mt="10px"
            mx="10px"
            bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
            {loadColumns(column, index)}
          </Box>
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

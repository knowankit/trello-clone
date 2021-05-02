import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Input
} from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';
import { CardDetail } from '@/src/types/cards';

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
  const [cardDetail, setCardDetail] = useState<CardDetail>({ title: '' });

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
        <Heading as="h6" size="sm" mt="5px" textAlign="center">
          {column.columnName}
        </Heading>
        {column.cards.map((card, cardIndex) => (
          <Box
            key={cardIndex}
            m="5px"
            p="10px"
            height="80px"
            borderWidth="1px"
            bg="white"
            cursor="pointer"
            borderRadius="md"
            overflow="auto"
            _hover={{
              backgroundColor: 'darkblue'
            }}
            onClick={() => showCardDetail(cardIndex, columnIndex)}>
            {card.title}
          </Box>
        ))}
        <Button
          size="xs"
          my="10px"
          mx="5px"
          bg="brand"
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

    // Push the card details
    column.cards.push({ title: 'Card title' + new Date().toString() });

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

  const showCardModal = () => {
    return (
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="title"
                size="sm"
                value={cardDetail && cardDetail.title}
                onChange={(e) => handleCardChange(e)}
                placeholder="card name"
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 122px)"
      overflowX="auto"
      id="parent-of-columns">
      <Box display="flex" position="absolute" height="100%">
        {columns.map((column, index) => (
          <Box
            key={index}
            rounded="lg"
            width="300px"
            display="flex"
            flexDirection="column"
            height="calc(100vh - 150px)"
            mt="10px"
            mx="10px"
            bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
            {loadColumns(column, index)}
          </Box>
        ))}
        <AddColumnButton addColumn={addColumn} />
      </Box>
      {showCardModal()}
    </Box>
  );
};

export default BoardColumns;

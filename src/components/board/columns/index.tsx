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
  Input,
  createStandaloneToast
} from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';

const BoardColumns = () => {
  const tempData = [
    { columnName: 'To-Do', cards: [] },
    { columnName: 'In Progress', cards: [] },
    { columnName: 'Done', cards: [] }
  ];

  const [columns, setColumns] = useState(tempData);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadColumns = (column, index) => {
    return (
      <React.Fragment key={index}>
        <Heading as="h6" size="sm" mt="5px" textAlign="center">
          {column.columnName}
        </Heading>
        {column.cards.map((card, index) => (
          <Box
            key={index}
            m="5px"
            p="10px"
            textAlign="center"
            height="80px"
            borderWidth="1px"
            bg="white"
            borderRadius="md"
            overflow="auto"
            _hover={{
              backgroundColor: 'darkblue'
            }}
            onClick={onOpen}>
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
            addCard(index);
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
    column.cards.push({ title: 'card title' });

    // Fetch all the columns
    const temp = columns;

    // Delete the old list and add the new list
    temp.splice(index, 1, column);
    setColumns([...temp]);
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
              <Input name="cardname" value="card title" placeholder="card name" />
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

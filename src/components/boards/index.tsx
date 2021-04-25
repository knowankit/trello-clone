import React, { useState } from 'react';
import {
  Box,
  Button,
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
import Link from 'next/link';
import dummyBoard from '@/src/static/boards.json';
import { Board } from '@/src/types/boards';

import shortId from 'shortid';

const Boards = () => {
  const [boardName, setBoardName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boards, setBoards] = useState<Board[]>(dummyBoard.boards);

  const handleChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleCreate = () => {
    const id = shortId.generate();
    const date = new Date().toLocaleString();

    const boardData = {
      id,
      date,
      name: boardName
    };

    const temp = boards;

    temp.push(boardData);

    setBoards(temp);
    setBoardName('');

    onClose();
  };

  const createBoardModal = () => {
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" size="lg" mt="1rem">
          Create a board
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={boardName}
                placeholder="Board name"
                onChange={(event) => handleChange(event)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleCreate}>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const loadExistingBoards = () => {
    return (
      <Box mt="1rem">
        {boards.map((board, index) => (
          <Link
            key={index}
            href={{
              pathname: '/boards/[slug]',
              query: { slug: board.id }
            }}>
            <Button key={index} mr=".5rem">
              {board.name}
            </Button>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <Box minHeight="50vh" flexGrow={3} ml="2%" boxShadow="lg" rounded="lg" bg="white" p="1rem">
      <h1>Boards page</h1>
      {createBoardModal()}
      {loadExistingBoards()}
    </Box>
  );
};

export default Boards;

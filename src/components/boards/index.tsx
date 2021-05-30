import React from 'react';
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
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/hooks';
import { updateBoardDetail, resetBoard } from '@/src/slices/board';
import { createBoard } from '@/src/slices/boards';

import { fetchBoards } from '@/src/slices/boards';

import shortId from 'shortid';

const Boards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boards = useAppSelector((state) => state.boards.boards);

  const dispatch = useDispatch();
  const board = useAppSelector((state) => state.board.board);

  const handleCreate = async () => {
    const id = shortId.generate();
    const date = new Date().toLocaleString();

    dispatch(updateBoardDetail({ type: '_id', value: id }));
    dispatch(updateBoardDetail({ type: 'dateCreated', value: date }));

    await dispatch(createBoard());
    await dispatch(fetchBoards());
    await dispatch(resetBoard());

    onClose();
  };

  const handleChange = (e) => {
    const data = {
      type: 'name',
      value: e.target.value
    };

    dispatch(updateBoardDetail(data));
  };

  const createBoardModal = () => {
    return (
      <>
        <Button onClick={onOpen} colorScheme="green" size="lg" mt="1rem">
          Create a board
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} backgroundColor="darkmode" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={board.name}
                onChange={(e) => handleChange(e)}
                placeholder="Board name"
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
      <Box mt="1rem" minWidth="50vw">
        {boards.map((board, index) => (
          <Link
            key={index}
            href={{
              pathname: '/boards/[slug]',
              query: { slug: board._id }
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
    <Box flexGrow={3} mx="2%" boxShadow="dark-lg" rounded="lg" backgroundColor="darkmode" p="1rem">
      <p color="white">Boards page</p>
      {createBoardModal()}
      {loadExistingBoards()}
    </Box>
  );
};

export default Boards;

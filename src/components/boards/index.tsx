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
  Input,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/hooks';
import { updateBoardDetail, resetBoard } from '@/src/slices/board';
import { createBoard } from '@/src/slices/boards';
import { AiOutlinePlus } from 'react-icons/ai';
import { fetchBoards } from '@/src/slices/boards';

import shortId from 'shortid';

const Boards = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const boards = useAppSelector((state) => state.boards.boards);

  const dispatch = useDispatch();
  const board = useAppSelector((state) => state.board.board);

  const boardRequest = useAppSelector((state) => state.boards.isRequesting);

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
        <Button
          onClick={onOpen}
          leftIcon={<AiOutlinePlus />}
          colorScheme="green"
          size="lg"
          mt="1rem">
          Create a board
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
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
              <Button onClick={handleCreate} isLoading={boardRequest} loadingText="Creating board">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const loadExistingBoards = () => {
    return (
      <Box mt="1rem" minWidth="50vw" display="flex" flexWrap="wrap">
        {boards.map((board, index) => (
          <Link
            key={index}
            href={{
              pathname: '/boards/[slug]',
              query: { slug: board._id }
            }}>
            <Box
              mr="1rem"
              mt="1rem"
              height="150px"
              width="150px"
              background={`linear-gradient(
                rgba(0, 0, 0, 0.4),
                rgba(0, 0, 0, 0.4)
              ),
              url(${board.backgroundImage})`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              borderRadius="5px"
              boxShadow="lg"
              cursor="pointer">
              <Text
                marginTop="calc(50% - 25px)"
                height="25px"
                textAlign="center"
                textTransform="capitalize"
                color="white"
                fontSize="20px"
                fontWeight="bold">
                {board.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    );
  };

  return (
    <Box flexGrow={3} mx="2%" boxShadow="base" rounded="lg" bg="white" p="1rem">
      {createBoardModal()}
      {loadExistingBoards()}
    </Box>
  );
};

export default Boards;

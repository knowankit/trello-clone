import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  MenuDivider,
  Input,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { updateBoardDetail, saveBoard, fetchBoard } from '@/src/slices/board';
import { AiFillSetting } from 'react-icons/ai';

const BoardSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const board = useAppSelector((state) => state.board.board);
  const isLoading = useAppSelector((state) => state.board.isLoading);
  const dispatch = useDispatch();

  const handleSave = async () => {
    await dispatch(saveBoard());
    await dispatch(fetchBoard(board._id));

    onClose();
  };

  const settingsModal = () => {
    if (!isOpen) return;

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email">
              <FormLabel>Board name</FormLabel>
              <Input
                value={board.name}
                onChange={(e) =>
                  dispatch(updateBoardDetail({ type: 'name', value: e.target.value }))
                }
              />
              <FormHelperText>You can change this any time</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr="10px">
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSave} isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const onMenuClick = () => {
    onOpen();
  };

  return (
    <>
      <Box position="absolute" right="10px">
        <Link href="/boards">
          <Button size="xs" ml="10px" mr="10px">
            Boards
          </Button>
        </Link>
        <Menu>
          <MenuButton size="sm" as={Button} bg="darkblue">
            <AiFillSetting />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Board Settings">
              <MenuItem onClick={onMenuClick}>Change name</MenuItem>
              <MenuItem>Add Background Image</MenuItem>
              <MenuDivider />
              <MenuItem>Delete board</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      {settingsModal()}
    </>
  );
};

export default BoardSettings;

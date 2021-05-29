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
import {
  updateBoardDetail,
  saveBoard,
  fetchBoard,
  deleteBoard,
  resetBoard
} from '@/src/slices/board';
import { AiFillSetting, AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';

const BoardSettings = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const board = useAppSelector((state) => state.board.board);
  const boardDetail = useAppSelector((state) => state.board);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async () => {
    await dispatch(saveBoard());
    await dispatch(fetchBoard(board._id));

    onClose();
  };

  const settingsModal = (): JSX.Element => {
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
              isLoading={boardDetail.isLoading}>
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

  const handleDelete = async () => {
    await dispatch(deleteBoard());

    if (boardDetail.status === 'success') {
      router.push('/boards');
    }
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
              <MenuItem onClick={handleDelete} closeOnSelect={false}>
                <AiOutlineDelete color="red" /> &nbsp; Delete board
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
      {settingsModal()}
    </>
  );
};

export default BoardSettings;

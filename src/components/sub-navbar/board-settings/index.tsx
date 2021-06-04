import React from 'react';
import {
  Button,
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
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { updateBoardDetail, saveBoard, fetchBoard, deleteBoard } from '@/src/slices/board';
import { AiFillSetting } from 'react-icons/ai';
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
        <Button onClick={onOpen} size="sm" as={Button} bg="darkblue">
          <AiFillSetting />
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Board Settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs isFitted variant="enclosed">
                <TabList mb="2rem">
                  <Tab>Basic</Tab>
                  <Tab>Advance</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
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
                    <Box mt="5px">Set Background Image</Box>
                    <Box align="right">
                      <Button variant="ghost" mr="10px">
                        Cancel
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={handleSave}
                        isLoading={boardDetail.isLoading}>
                        Save
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <p>To delete your board, Click on Delete button.</p>
                    <Box align="right">
                      <Button bg="red.500" color="white" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default BoardSettings;

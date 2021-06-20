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
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { updateBoardDetail, saveBoard, fetchBoard, deleteBoard } from '@/src/slices/board';
import { AiFillSetting, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import { useRouter } from 'next/router';

const BoardSettings = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const board = useAppSelector((state) => state.board.board);
  const boardDetail = useAppSelector((state) => state.board);
  const boardDelete = useAppSelector((state) => state.board.isLoading);
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
      <Button onClick={onOpen} size="xs" as={Button} m="5px">
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
                  <Box align="right">
                    <Button
                      backgroundColor="success"
                      color="white"
                      onClick={handleSave}
                      isLoading={boardDetail.isLoading}>
                      <AiOutlineCheck /> &nbsp; Save
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <p>To delete your board, Click on Delete button.</p>
                  <Box align="right">
                    <Button
                      bg="red.500"
                      color="white"
                      onClick={handleDelete}
                      _hover={{
                        backgroundColor: 'red.600'
                      }}
                      isLoading={boardDelete}
                      loadingText="Deleting">
                      <AiOutlineDelete /> &nbsp;Delete
                    </Button>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default BoardSettings;

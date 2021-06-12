import React, { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  ModalOverlay,
  Textarea,
  Text,
  Box,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { CardDetail } from '@/src/types/cards';
import { deleteCard, fetchCards, updateCard } from '@/src/slices/cards';
import { useAppSelector } from '@/src/hooks';
import { AiOutlineDelete, AiOutlineClose, AiOutlineLaptop } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';
import { MdLabelOutline } from 'react-icons/md';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: CardDetail;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);
  const cardRequest = useAppSelector((state) => state.cards.isRequesting);
  const cardDelete = useAppSelector((state) => state.cards.isDeleting);

  const cardLabels = [
    {
      type: 'Performance',
      color: '#0079bf'
    },
    {
      type: 'Bug',
      color: '#eb5a46'
    },
    {
      type: 'Feature',
      color: '#61bd4f'
    },
    {
      type: 'Information',
      color: '#ff9f1a'
    },
    {
      type: 'Documentation',
      color: '#0079bf'
    }
  ];

  const handleCardDelete = async () => {
    await dispatch(deleteCard(card._id));
    await dispatch(fetchCards());

    onClose();
  };

  const handleModalClose = async () => {
    const data = {
      _id: card._id,
      title,
      description,
      columnId: card.columnId
    };

    await dispatch(updateCard(data));
    await dispatch(fetchCards());

    onClose();
  };

  return (
    <>
      <Modal size="xl" onClose={handleModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box display="flex" marginTop="1rem">
              <AiOutlineLaptop />
              <Input
                name="title"
                size="sm"
                marginLeft="1rem"
                value={title}
                fontWeight="bold"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Card title"
              />
            </Box>
            <Box display="flex">
              <Box width="100%" marginTop="2rem">
                <Box display="flex" fontWeight="bold">
                  <GrTextAlignFull />
                  <Text marginLeft="1rem">Description</Text>
                </Box>
                <Textarea
                  my="4"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a more detailed Description..."
                  overflow="hidden"
                  marginLeft="1.5rem"
                />
              </Box>
              <Box marginTop="2rem" marginLeft="2rem" flexDirection="column" width="20%">
                <Text as="samp" whiteSpace="nowrap">
                  ADD TO CARD
                </Text>
                <List spacing={3} p="5px">
                  <ListItem>
                    <Menu>
                      <MenuButton
                        leftIcon={<MdLabelOutline />}
                        size="xs"
                        whiteSpace="nowrap"
                        as={Button}
                        width="100%">
                        Labels
                      </MenuButton>
                      <MenuList padding="5px">
                        {cardLabels.map((item, index) => (
                          <MenuItem bg={item.color} marginBottom="5px" key={index}>
                            <Box minH="30px"></Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size="xs"
              marginRight="1rem"
              onClick={handleCardDelete}
              disabled={cardDelete}
              isLoading={cardDelete}
              loadingText="Deleting"
              bg="red.500"
              color="white"
              _hover={{
                backgroundColor: 'red.600'
              }}>
              <AiOutlineDelete />
            </Button>
            <Button
              size="xs"
              onClick={handleModalClose}
              disabled={cardRequest}
              isLoading={cardRequest}
              loadingText="Updating">
              <AiOutlineClose /> &nbsp; Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;

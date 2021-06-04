import React, { FC, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  Input,
  ModalOverlay,
  Textarea
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { CardDetail } from '@/src/types/cards';
import { deleteCard, fetchCards, updateCard } from '@/src/slices/cards';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: CardDetail;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(card?.title);
  const [description, setDescription] = useState(card?.description);

  const handleCardDelete = async () => {
    await dispatch(deleteCard(card._id));
    await dispatch(fetchCards());

    onClose();
  };

  const handleModalClose = async () => {
    const data = {
      _id: card._id,
      title,
      description
    };

    await dispatch(updateCard(data));
    await dispatch(fetchCards());

    onClose();
  };

  return (
    <>
      <Modal onClose={handleModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="title"
              size="sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
            />
            <Textarea
              my="4"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              overflow="hidden"
            />
            <Button onClick={handleCardDelete}>Delete card</Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardDetailsModal;

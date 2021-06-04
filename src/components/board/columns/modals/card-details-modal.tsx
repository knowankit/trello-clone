import React, { FC } from 'react';
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
import { deleteCard, fetchCards } from '@/src/slices/cards';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  card: CardDetail;
  handleCardChange: (e) => void;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, card, handleCardChange }) => {
  const dispatch = useDispatch();

  const handleCardDelete = async () => {
    await dispatch(deleteCard(card._id));
    await dispatch(fetchCards());

    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="title"
              size="sm"
              value={card.title}
              onChange={(e) => handleCardChange(e)}
              placeholder="card name"
            />
            <Textarea
              my="4"
              name="description"
              value={card.description}
              onChange={(e) => handleCardChange(e)}
              placeholder="description"
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

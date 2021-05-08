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
import { CardDetail } from '@/src/types/cards';
import PropTypes from 'prop-types';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  cardDetail: CardDetail;
  handleCardChange: (e) => void;
};

const CardDetailsModal: FC<Props> = ({ onClose, isOpen, cardDetail, handleCardChange }) => {
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
              value={cardDetail.title}
              onChange={(e) => handleCardChange(e)}
              placeholder="card name"
            />
            <Textarea
              my="4"
              name="description"
              value={cardDetail.description}
              onChange={(e) => handleCardChange(e)}
              placeholder="description"
              overflow="hidden"
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

CardDetailsModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  cardDetail: PropTypes.exact({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string
  }),
  handleCardChange: PropTypes.func
};

export default CardDetailsModal;

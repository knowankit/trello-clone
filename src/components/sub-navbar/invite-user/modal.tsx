import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from '@chakra-ui/react';
import checkEnvironment from '@/util/check-environment';
import { useAppSelector } from '@/src/hooks';

const host = checkEnvironment();

const InviteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [isMailSending, setMailSending] = useState(false);
  const board = useAppSelector((state) => state.board.board);

  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

  const handleClick = async () => {
    setMailSending(true);
    await sendEmail();
    setMailSending(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validate();
  };
  const validate = () => {
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  };

  const sendEmail = async () => {
    const url = `${host}/api/mail`;

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, boardId: board._id })
    });

    const inJSON = await response.json();

    if (inJSON.status === 200) {
      onClose();
      setEmail('');
    }
  };

  return (
    <>
      <Button onClick={onOpen} size="xs" ml="5px">
        Invite
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </ModalBody>
          {emailErr && <p>{emailErr}</p>}
          <ModalFooter>
            <Button
              disabled={!validEmail.test(email)}
              colorScheme="blue"
              mr={3}
              onClick={handleClick}
              isLoading={isMailSending}
              loadingText="Sending">
              Invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteModal;

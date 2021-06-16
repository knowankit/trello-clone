import {
  Box,
  Heading,
  Button,
  Avatar,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react';
import PropType from 'prop-types';
import BoardSettings from '@/src/components/sub-navbar/board-settings';
import InviteModal from '@/src/components/sub-navbar/invite-user/modal';
import React from 'react';
import { useAppSelector } from '@/src/hooks';
import Link from 'next/link';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import Unsplash from './board-settings/unsplash';

const SubNavbar = (): JSX.Element => {
  const board = useAppSelector((state) => state.board.board);
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box height="40px" display="flex" alignItems="center" justifyContent="space-between">
      <Heading ml="0.5rem" color="black" as="h4" size="sm" whiteSpace="nowrap" d="block">
        {board && board.name}
      </Heading>
      <Box>
        <Tooltip label={user.fullName} aria-label="A tooltip">
          <Avatar size="sm" name={user.fullName} src="https://bit.ly/tioluwani-kolawole" />
        </Tooltip>
      </Box>
      <Box>
        <InviteModal />
        <Link href="/boards">
          <Button size="xs" ml="10px" mr="10px">
            Boards
          </Button>
        </Link>
        <BoardSettings />
        <Button size="xs" ml="10px" mr="10px" ref={btnRef} onClick={onOpen}>
          <RiArchiveDrawerLine />
        </Button>
        <Drawer
          size="md"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Choose background image</DrawerHeader>

            <DrawerBody>
              <Unsplash />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;

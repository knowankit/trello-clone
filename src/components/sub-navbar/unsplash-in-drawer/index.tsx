import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { saveBoard } from '@/src/slices/board';

import PropType from 'prop-types';
import React from 'react';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import Unsplash from '@/src/components/sub-navbar/unsplash-in-drawer/unsplash';
import { useAppSelector } from '@/src/hooks';

const SubNavbar = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const board = useAppSelector((state) => state.board);

  const dispatch = useDispatch();

  const btnRef = React.useRef();

  const handleSave = async () => {
    await dispatch(saveBoard());
    onClose();
  };

  return (
    <>
      <Button size="xs" ml="10px" mr="10px" ref={btnRef} onClick={onOpen}>
        <RiArchiveDrawerLine />
      </Button>
      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose background image</DrawerHeader>
          <DrawerBody>
            <Unsplash />
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme="blue"
              onClick={handleSave}
              loadingText="Saving"
              isLoading={board.isLoading}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;

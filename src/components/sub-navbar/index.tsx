import { Box, Heading, Button, Avatar, Tooltip } from '@chakra-ui/react';

import PropType from 'prop-types';
import BoardSettings from '@/src/components/sub-navbar/board-settings';
import InviteModal from '@/src/components/sub-navbar/invite-user/modal';
import React from 'react';
import { useAppSelector } from '@/src/hooks';
import Link from 'next/link';
import UnsplashDrawer from '@/src/components/sub-navbar/unsplash-in-drawer';

const SubNavbar = (): JSX.Element => {
  const board = useAppSelector((state) => state.board.board);
  const user = useAppSelector((state) => state.user);

  return (
    <Box
      height="40px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="rgba(0,0,0,0.1)">
      <Heading ml="0.5rem" color="white" as="h4" size="sm" whiteSpace="nowrap" d="block">
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
        <UnsplashDrawer />
      </Box>
    </Box>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;

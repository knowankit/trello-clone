import { Box, Heading, Button, Avatar, Tooltip } from '@chakra-ui/react';
import PropType from 'prop-types';
import BoardSettings from '@/src/components/sub-navbar/board-settings';
import InviteModal from '@/src/components/sub-navbar/invite-user/modal';
import React from 'react';
import { useAppSelector } from '@/src/hooks';
import Link from 'next/link';

const SubNavbar = (): JSX.Element => {
  const board = useAppSelector((state) => state.board.board);
  const user = useAppSelector((state) => state.user);

  return (
    <Box
      height="50px"
      bg="brand"
      boxShadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between">
      <Heading ml="0.5rem" color="white" as="h3" size="lg" whiteSpace="nowrap" d="block">
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
      </Box>
    </Box>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;

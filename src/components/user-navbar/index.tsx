import React, { FC } from 'react';
import {
  Button,
  Image,
  Flex,
  Box,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/src/hooks';

const UserNavBar: FC = () => {
  const user = useAppSelector((state) => state.user);

  const logout = async () => {
    const URL = '/api/logout';

    const response = await fetch(URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({})
    });

    const responseInJson = await response.json();

    if (responseInJson.message === 'success') {
      window.location.href = `${window.location.origin}/login`;
    }
  };

  const renderButtons = () => {
    if (user?.isValid) {
      return (
        <>
          <Menu>
            <MenuButton size="xs" mr="5px">
              <Avatar
                size="sm"
                name={user.fullName}
                color="white"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </>
      );
    }

    return (
      <>
        <Button fontSize="20" color="brand" variant="link" float="right" mr="2" pr="2">
          <Link href="/login">Log in</Link>
        </Button>
        <Button fontSize="md" colorScheme="green" color="white" m="4">
          <Link href="/signup">Sign up</Link>
        </Button>
      </>
    );
  };

  return (
    <Box boxShadow="sm" bg="rgba(0,0,0,0.2)">
      <Flex>
        <Image height="4" src="/trello-logo.svg" alt="brand logo" m="4"></Image>
        <Spacer />
        {renderButtons()}
      </Flex>
    </Box>
  );
};

UserNavBar.propTypes = {
  bg: PropTypes.string
};

export default UserNavBar;

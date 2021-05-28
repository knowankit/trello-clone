import React, { FC } from 'react';
import { Button, Image, Flex, Box, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';

type IProps = {
  bg?: string;
};

const NavBar: FC<IProps> = ({ bg }) => {
  const user = useAppSelector((state) => state.user);

  const renderButtons = () => {
    if (user.isValid) {
      return (
        <Button fontSize="20" color="danger" variant="link" float="right" mr="2" pr="2">
          Log out
        </Button>
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

  // const logout = () => {};

  return (
    <Box bg={bg} boxShadow="lg">
      <Flex>
        <Image height="8" src="/trello-logo.svg" alt="brand logo" m="5"></Image>
        <Spacer />
        {renderButtons()}
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string
};

export default NavBar;

import React, { FC } from 'react';
import { Button, Image, Flex, Box, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';

type IProps = {
  bg?: string;
};

const NavBar: FC<IProps> = ({ bg }) => {
  return (
    <Box bg={bg} boxShadow="lg">
      <Flex>
        <Image height="8" src="/trello-logo.svg" alt="brand logo" m="5"></Image>
        <Spacer />
        <Button fontSize="20" color="brand" variant="link" float="right" mr="2" pr="2">
          <Link href="/login">Log in</Link>
        </Button>
        <Button fontSize="md" colorScheme="green" color="white" m="4">
          <Link href="/signup">Sign up</Link>
        </Button>
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string
};

export default NavBar;

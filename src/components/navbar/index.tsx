import React from 'react';
import { Button, Image, Flex, Box, Spacer, Grid } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Flex>
      <Image height="8" src="/trello-logo-blue.svg" alt="brand logo" m="5"></Image>
      <Spacer />
      <Button fontSize="20" color="brand" variant="link" float="right" mr="2" pr="2">
        <a href="/login">Log in</a>
      </Button>
    </Flex>
  );
};

export default NavBar;

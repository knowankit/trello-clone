import React, { FC } from 'react';
import { Button, Image, Flex, Box, Spacer, Grid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

type IProps = {
  bg?: string;
};

const NavBar: FC<IProps> = ({ bg }) => {
  return (
    <Box bg={bg}>
      <Flex>
        <Image height="8" src="/trello-logo.svg" alt="brand logo" m="5"></Image>
        <Spacer />
        <Button fontSize="20" color="brand" variant="link" float="right" mr="2" pr="2">
          <a href="/login">Log in</a>
        </Button>
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string
};

export default NavBar;

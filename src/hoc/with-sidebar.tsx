import React, { Component } from 'react';
import { Container, Box, Button } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild
} from 'react-icons/ai';
import Link from 'next/link';

const withSidebar = (WrappedComponent, props) => {
  return class BoardWithSidebar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { page } = props;

      return (
        <Container maxW="container.xl" display="table">
          <Box display="flex" mt="5%">
            <Box minHeight="50vh" flexGrow={1} boxShadow="lg" rounded="lg" p="1em">
              <Box display="flex" flexDirection="column">
                <Link href="/home">
                  <Button
                    mb="5px"
                    display="flex"
                    justifyContent="left"
                    colorScheme={page === 'home' ? 'blue' : 'gray'}>
                    <>
                      <AiOutlineHome /> &nbsp; Home
                    </>
                  </Button>
                </Link>
                <Link href="/boards">
                  <Button
                    mb="5px"
                    display="flex"
                    justifyContent="left"
                    colorScheme={page === 'boards' ? 'blue' : 'gray'}>
                    <>
                      <AiOutlineCreditCard /> &nbsp; Boards
                    </>
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button
                    mb="5px"
                    display="flex"
                    justifyContent="left"
                    colorScheme={page === 'templates' ? 'blue' : 'gray'}>
                    <>
                      <AiOutlineBuild /> &nbsp; Templates
                    </>
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    mb="5px"
                    display="flex"
                    justifyContent="left"
                    colorScheme={page === 'settings' ? 'blue' : 'gray'}>
                    <>
                      <AiOutlineSetting /> &nbsp; Settings
                    </>
                  </Button>
                </Link>
              </Box>
            </Box>
            <WrappedComponent />
          </Box>
        </Container>
      );
    }
  };
};

export default withSidebar;

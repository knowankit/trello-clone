import React, { Component } from 'react';
import { Container, Box, Button } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild
} from 'react-icons/ai';

const withSidebar = (WrappedComponent, props) => {
  return class BoardWithSidebar extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Container maxW="container.xl" display="table">
          <Box display="flex" mt="5%">
            <Box minHeight="50vh" flexGrow={1} boxShadow="lg" rounded="lg" p="1em">
              <Box display="flex" flexDirection="column">
                <Button mb="5px" display="flex" justifyContent="left">
                  <AiOutlineHome /> &nbsp; Home
                </Button>
                <Button mb="5px" display="flex" justifyContent="left">
                  <AiOutlineCreditCard /> &nbsp; Boards
                </Button>
                <Button mb="5px" display="flex" justifyContent="left">
                  <AiOutlineBuild /> &nbsp; Templates
                </Button>
                <Button mb="5px" display="flex" justifyContent="left">
                  <AiOutlineSetting /> &nbsp; Settings
                </Button>
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

import { Box, Wrap, WrapItem, Avatar, Heading } from '@chakra-ui/react';
import PropType from 'prop-types';
import React from 'react';

const SubNavbar = ({ board }) => {
  return (
    <Box height="50px" bg="brand" boxShadow="md" display="flex">
      <Heading ml="0.5rem" color="white" as="h3" size="lg" alignSelf="center" whiteSpace="nowrap">
        {board.name}
      </Heading>
      <Box display="flex" alignItems="center" justifyContent="center" width="100%">
        <Wrap>
          <WrapItem>
            <Avatar size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </WrapItem>
          <WrapItem>
            <Avatar size="sm" name="Kola Tioluwani" src="https://bit.ly/tioluwani-kolawole" />
          </WrapItem>
          <WrapItem>
            <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          </WrapItem>
          <WrapItem>
            <Avatar size="sm" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          </WrapItem>
        </Wrap>
      </Box>
    </Box>
  );
};

SubNavbar.propTypes = {
  board: PropType.object
};

export default SubNavbar;
